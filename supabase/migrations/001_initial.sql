-- Player profile (one row per user)
create table if not exists profiles (
  id uuid references auth.users primary key,
  display_name text,
  lang text default 'fr',
  xp integer default 0,
  level integer default 1,
  created_at timestamptz default now()
);

-- One row per problem attempt
create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  problem_id text,          -- e.g. "sec1.mental-math.1"
  correct boolean,
  time_ms integer,          -- how long they took
  strategy text,            -- which strategy was shown
  created_at timestamptz default now()
);

-- Tracks mastery per topic (recomputed on each attempt)
create table if not exists mastery (
  user_id uuid references profiles(id),
  topic_id text,            -- e.g. "sec1.mental-math"
  correct_count integer default 0,
  attempt_count integer default 0,
  mastered boolean default false,
  updated_at timestamptz default now(),
  primary key (user_id, topic_id)
);
