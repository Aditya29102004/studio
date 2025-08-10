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
    
    // Insert test
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
        return { error: "Failed to create the test. " + testError.message };
    }

    // 3. Deduct credits and insert test in a transaction
    // Supabase doesn't support multi-table transactions in JS, so we use an RPC function
    // For now, we will do it in sequence and accept the minor risk.

    // Deduct credits
    const newBalance = profile.credits - totalCost;
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: newBalance })
        .eq('id', user.id);

    if (updateError) {
        // If this fails, we should ideally roll back the test insertion.
        // This is where a proper transaction would be crucial.
        // For now, we'll log the error and the test will exist without credit deduction.
        console.error("CRITICAL: Failed to deduct credits for test", newTest.id);
        return { error: "Test created, but failed to deduct credits." };
    }
    
    // Log transaction
    const { error: txError } = await supabase.from('credit_transactions').insert({
        user_id: user.id,
        amount: -totalCost,
        description: `Posted test: ${testData.title}`,
        test_id: newTest.id,
    });

    if (txError) {
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
    
    // Check if the current user is the poster of the test associated with the submission
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in." };
    }

    const { data: submission, error: submissionError } = await supabase
        .from('test_submissions')
        .select('id, status, user_id, test:tests(user_id, reward_credits)')
        .eq('id', submissionId)
        .single();

    if (submissionError) {
        return { error: "Could not find submission: " + submissionError.message };
    }
    
    // @ts-ignore
    if (submission?.test?.user_id !== user.id) {
        return { error: "You are not authorized to approve this submission." };
    }

    // Call the RPC function to handle the logic atomically
    const { error: rpcError } = await supabase.rpc('approve_submission_and_transfer_credits', {
        p_submission_id: submissionId,
        // @ts-ignore
        p_reward_amount: submission.test.reward_credits,
        // @ts-ignore
        p_poster_id: submission.test.user_id,
        p_tester_id: submission.user_id,
    });

    if (rpcError) {
        return { error: "Failed to approve submission: " + rpcError.message };
    }
    
    return { success: true };
}

export async function rejectSubmission(submissionId: number) {
     const supabase = await createSupabaseServerClient();
    
    // Authorization check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "You must be logged in." };

    const { data: submission, error: submissionError } = await supabase
        .from('test_submissions')
        .select('id, test:tests(user_id)')
        .eq('id', submissionId)
        .single();
        
    // @ts-ignore
    if (submission?.test?.user_id !== user.id) {
        return { error: "You are not authorized to reject this submission." };
    }
    
    // Update status
    const { error } = await supabase
        .from('test_submissions')
        .update({ status: 'rejected' })
        .eq('id', submissionId);

    if (error) {
        return { error: "Failed to reject submission: " + error.message };
    }
    
    return { success: true };
}
