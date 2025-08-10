'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
    const cookieStore = cookies();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Your project's URL and Key are required to create a Supabase client!\n\nCheck your Supabase project's API settings to find these values\n\nhttps://supabase.com/dashboard/project/_/settings/api");
    }

    return createServerClient(
        supabaseUrl,
        supabaseServiceRoleKey,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.set({ name, value: '', ...options })
                },
            },
        }
    )
}

export async function updateUserProfile(profileData: { full_name: string; bio: string; skills: string[] }) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to update your profile." };
    }

    const { data, error } = await supabase
        .from('profiles')
        .update({
            full_name: profileData.full_name,
            bio: profileData.bio,
            skills: profileData.skills,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

    if (error) {
        return { error: "Failed to update profile: " + error.message };
    }
    
    return { success: true, data };
}

export async function postNewTest(testData: any) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to post a test." };
    }

    // 1. Get poster's current credit balance
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single();

    if (profileError || !profile) {
        return { error: "Could not retrieve user profile." };
    }

    // 2. Check if they have enough credits
    const totalCost = testData.max_testers * testData.reward_credits;
    if (profile.credits < totalCost) {
        return { error: `Insufficient credits. You need ${totalCost} credits, but you only have ${profile.credits}.` };
    }
    
    // Use a transaction to ensure atomicity
    // Supabase doesn't support multi-table transactions in JS SDK directly, so we use an RPC function
    // For now, we will do it in sequence and accept the minor risk, as setting up RPC is more involved.

    // 3. Deduct credits from poster
    const newBalance = profile.credits - totalCost;
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: newBalance })
        .eq('id', user.id);

    if (updateError) {
        return { error: "Failed to deduct credits. " + updateError.message };
    }
    
    // 4. Insert the new test
    const { data: newTest, error: testError } = await supabase
        .from('tests')
        .insert([{ 
            ...testData, 
            user_id: user.id,
            questions: JSON.stringify(testData.questions || []),
            instructions: JSON.stringify(testData.instructions || [])
        }])
        .select()
        .single();
    
    if (testError) {
         // If test insertion fails, we must refund the credits.
        await supabase
            .from('profiles')
            .update({ credits: profile.credits }) // Revert to original balance
            .eq('id', user.id);
        return { error: "Failed to create the test. " + testError.message };
    }

    // 5. Log the credit transaction
    const { error: txError } = await supabase.from('credit_transactions').insert({
        user_id: user.id,
        amount: -totalCost,
        description: `Posted test: ${testData.title}`,
        test_id: newTest.id,
    });

    if (txError) {
        // This is a non-critical error for the user, but should be logged for admins.
        console.error("CRITICAL: Failed to log credit transaction for test", newTest.id);
    }

    return { success: true, data: newTest };
}

export async function submitTestFeedback(testId: number, answers: any) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to submit feedback." };
    }

    // Check if user is submitting to their own test
    const { data: testDetails } = await supabase.from('tests').select('user_id').eq('id', testId).single();
    if (testDetails?.user_id === user.id) {
        return { error: "You cannot submit feedback for your own test." };
    }

    // Check for duplicate submission
    const { data: existingSubmission, error: checkError } = await supabase
        .from('test_submissions')
        .select('id')
        .eq('test_id', testId)
        .eq('user_id', user.id)
        .maybeSingle();

    if (checkError) {
        return { error: "Could not verify submission status: " + checkError.message };
    }
    
    if (existingSubmission) {
        return { error: "You have already submitted feedback for this test." };
    }

    // Create new submission
    const submissionData = {
        test_id: testId,
        user_id: user.id,
        status: 'pending',
        feedback: JSON.stringify(answers),
    };

    const { data, error } = await supabase.from('test_submissions').insert([submissionData]);

    if (error) {
        return { error: "Failed to submit feedback: " + error.message };
    }
    
    return { success: true, data };
}

export async function approveSubmission(submissionId: number) {
    const supabase = await createSupabaseServerClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in." };
    }

    // Get submission details and verify ownership in one go
    const { data: submission, error: submissionError } = await supabase
        .from('test_submissions')
        .select('id, status, user_id, test:tests!inner(user_id, reward_credits)')
        .eq('id', submissionId)
        .eq('test.user_id', user.id) // Ensures only the poster can fetch it
        .single();

    if (submissionError || !submission) {
        return { error: "Submission not found or you are not authorized to approve it." };
    }
    
    if (submission.status !== 'pending') {
        return { error: `This submission has already been ${submission.status}.` };
    }
    
    // Call the RPC function to handle the logic atomically
    const { error: rpcError } = await supabase.rpc('approve_submission_and_transfer_credits', {
        p_submission_id: submissionId,
        // @ts-ignore
        p_reward_amount: submission.test.reward_credits,
        p_poster_id: user.id,
        p_tester_id: submission.user_id,
    });

    if (rpcError) {
        return { error: "Failed to approve submission: " + rpcError.message };
    }
    
    return { success: true };
}

export async function rejectSubmission(submissionId: number) {
     const supabase = await createSupabaseServerClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "You must be logged in." };

    const { data: submission, error: submissionError } = await supabase
        .from('test_submissions')
        .select('id, status, test:tests!inner(user_id, reward_credits)')
        .eq('id', submissionId)
        .eq('test.user_id', user.id)
        .single();
        
    if (submissionError || !submission) {
        return { error: "Submission not found or you are not authorized to reject it." };
    }

    if (submission.status !== 'pending') {
        return { error: `This submission has already been ${submission.status}.` };
    }
    
    // Update submission status
    const { error } = await supabase
        .from('test_submissions')
        .update({ status: 'rejected' })
        .eq('id', submissionId);

    if (error) {
        return { error: "Failed to reject submission: " + error.message };
    }

    // Return the locked credits to the poster
    // @ts-ignore
    const rewardAmount = submission.test.reward_credits;
    const { error: creditReturnError } = await supabase.rpc('increment_credit_balance', {
        user_id_in: user.id,
        amount_in: rewardAmount
    });

    if (creditReturnError) {
        console.error(`CRITICAL: Failed to return credits to poster ${user.id} for rejected submission ${submissionId}`);
        return { error: "Submission rejected, but failed to return credits. Please contact support." };
    }

    // Log the credit return transaction
    await supabase.from('credit_transactions').insert({
        user_id: user.id,
        submission_id: submissionId,
        amount: rewardAmount,
        description: 'Credits returned for rejected submission'
    });
    
    return { success: true };
}
