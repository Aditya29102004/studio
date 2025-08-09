-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  credits integer default 20 not null,
  bio text,
  skills text[],
  tests_posted_count integer default 0,
  tests_completed_count integer default 0,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create a table for tests
create table tests (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    title text not null,
    description text,
    reward_credits integer not null check (reward_credits >= 5),
    deadline timestamp with time zone,
    form_url text,
    status text default 'open' not null, -- open, closed
    poster_id uuid references public.profiles not null
);

alter table tests enable row level security;
create policy "Tests are viewable by everyone." on tests for select using (true);
create policy "Users can insert their own tests." on tests for insert with check (auth.uid() = poster_id);
create policy "Users can update their own tests." on tests for update with check (auth.uid() = poster_id);
create policy "Users can close their own tests." on tests for update with check (auth.uid() = poster_id) and (status = 'closed');


-- Create a table for test submissions
create table submissions (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    test_id uuid references public.tests not null,
    tester_id uuid references public.profiles not null,
    status text default 'in_progress' not null, -- in_progress, submitted, approved, rejected
    feedback_text text,
    file_url text,
    unique(test_id, tester_id)
);

alter table submissions enable row level security;
create policy "Submissions are viewable by poster and tester." on submissions for select using (auth.uid() = tester_id or auth.uid() = (select poster_id from tests where id = test_id));
create policy "Testers can insert submissions." on submissions for insert with check (auth.uid() = tester_id);
create policy "Testers can update their own submissions." on submissions for update with check (auth.uid() = tester_id);
create policy "Posters can update submission status." on submissions for update using (auth.uid() = (select poster_id from tests where id = test_id));


-- Create a table for credit transactions
create table credit_transactions (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    user_id uuid references public.profiles not null,
    amount integer not null,
    description text,
    related_test_id uuid references public.tests
);

alter table credit_transactions enable row level security;
create policy "Users can view their own transactions." on credit_transactions for select using (auth.uid() = user_id);

-- Function to handle credit deduction when posting a test
create or replace function deduct_credits_for_test()
returns trigger as $$
declare
  poster_credits integer;
begin
  select credits into poster_credits from public.profiles where id = new.poster_id;
  if poster_credits < new.reward_credits then
    raise exception 'Insufficient credits to post test';
  end if;

  update public.profiles
  set credits = credits - new.reward_credits
  where id = new.poster_id;
  
  insert into public.credit_transactions(user_id, amount, description, related_test_id)
  values(new.poster_id, -new.reward_credits, 'Posted test: ' || new.title, new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_test_created
  before insert on public.tests
  for each row execute procedure deduct_credits_for_test();

-- Function to handle credit transfer on submission approval
create or replace function transfer_credits_on_approval()
returns trigger as $$
declare
  test_reward integer;
  test_poster_id uuid;
begin
  if new.status = 'approved' and old.status <> 'approved' then
    select reward_credits, poster_id into test_reward, test_poster_id from public.tests where id = new.test_id;

    -- Add credits to tester
    update public.profiles
    set credits = credits + test_reward, tests_completed_count = tests_completed_count + 1
    where id = new.tester_id;

    -- Create transaction for tester
    insert into public.credit_transactions(user_id, amount, description, related_test_id)
    values(new.tester_id, test_reward, 'Completed test', new.test_id);
    
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_submission_approved
  after update on public.submissions
  for each row execute procedure transfer_credits_on_approval();
