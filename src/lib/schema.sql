-- Drop existing tables and types with cascade to remove dependent objects.
DROP TABLE IF EXISTS public.credit_transactions CASCADE;
DROP TABLE IF EXISTS public.test_submissions CASCADE;
DROP TABLE IF EXISTS public.tests CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TYPE IF EXISTS public.test_category;
DROP TYPE IF EXISTS public.test_status;
DROP TYPE IF EXISTS public.submission_status;
DROP TYPE IF EXISTS public.proof_method;


-- Create custom ENUM types for structured data.
CREATE TYPE public.test_category AS ENUM ('Website', 'App', 'Form', 'Design Review', 'Other');
CREATE TYPE public.test_status AS ENUM ('open', 'closed', 'archived');
CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.proof_method AS ENUM ('form', 'manual');


-- Create Profiles table to store user data.
-- This table is linked to auth.users via a trigger.
CREATE TABLE public.profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    updated_at timestamp with time zone,
    full_name text,
    avatar_url text,
    bio text,
    skills text[],
    credits numeric NOT NULL DEFAULT 0,
    reputation_score integer NOT NULL DEFAULT 50
);

-- Set up Row Level Security (RLS) for profiles.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);


-- Create Tests table for user-submitted tests.
CREATE TABLE public.tests (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    title text NOT NULL,
    description text,
    category public.test_category NOT NULL,
    status public.test_status NOT NULL DEFAULT 'open',
    estimated_time integer, -- in minutes
    reward_credits numeric NOT NULL,
    max_testers integer,
    instructions jsonb,
    questions jsonb,
    proof_method public.proof_method NOT NULL DEFAULT 'form'
);

-- Set up RLS for tests.
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tests are viewable by authenticated users." ON public.tests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert their own tests." ON public.tests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tests." ON public.tests FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);


-- Create Test Submissions table.
CREATE TABLE public.test_submissions (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    test_id bigint NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    status public.submission_status NOT NULL DEFAULT 'pending',
    feedback jsonb,
    UNIQUE (test_id, user_id) -- Prevent duplicate submissions
);

-- Set up RLS for submissions.
ALTER TABLE public.test_submissions ENABLE ROW LEVEL SECURITY;
-- Users can see their own submissions. Test posters can see submissions to their tests.
CREATE POLICY "Submissions are viewable by owners and test posters." ON public.test_submissions FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM tests WHERE tests.id = test_submissions.test_id AND tests.user_id = auth.uid())
);
CREATE POLICY "Users can insert their own submissions." ON public.test_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Posters can update the status of submissions to their tests.
CREATE POLICY "Posters can update submission status." ON public.test_submissions FOR UPDATE USING (
    EXISTS (SELECT 1 FROM tests WHERE tests.id = test_submissions.test_id AND tests.user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM tests WHERE tests.id = test_submissions.test_id AND tests.user_id = auth.uid())
);


-- Create Credit Transactions table for logging.
CREATE TABLE public.credit_transactions (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    test_id bigint REFERENCES public.tests(id) ON DELETE SET NULL,
    submission_id bigint REFERENCES public.test_submissions(id) ON DELETE SET NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    amount numeric NOT NULL,
    description text
);

-- Set up RLS for credit transactions.
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own credit transactions." ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);


-- Function to automatically create a profile when a new user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, credits, reputation_score)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    20, -- Welcome credits
    50  -- Initial reputation
  );
  -- Also log the welcome credits transaction
  INSERT INTO public.credit_transactions (user_id, amount, description)
  VALUES (new.id, 20, 'Welcome bonus on signup');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute the function on new user creation in auth.users.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- RPC function for atomically approving a submission and transferring credits.
CREATE OR REPLACE FUNCTION public.approve_submission_and_transfer_credits(
    p_submission_id bigint,
    p_reward_amount numeric,
    p_poster_id uuid,
    p_tester_id uuid
)
RETURNS void AS $$
BEGIN
  -- Update submission status to 'approved'
  UPDATE public.test_submissions
  SET status = 'approved'
  WHERE id = p_submission_id;

  -- Add credits to the tester's account
  UPDATE public.profiles
  SET credits = credits + p_reward_amount
  WHERE id = p_tester_id;
  
  -- Log the credit transaction for the tester
  INSERT INTO public.credit_transactions(user_id, submission_id, amount, description)
  VALUES (p_tester_id, p_submission_id, p_reward_amount, 'Reward for approved submission');

  -- Note: Credits were already deducted from the poster when the test was created.
  -- No further action is needed on the poster's balance for an approval.

END;
$$ LANGUAGE plpgsql;
