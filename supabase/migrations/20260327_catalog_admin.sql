create table if not exists public.consumer_apps (
  id text primary key,
  name text not null,
  description text,
  url text not null default '',
  repo text,
  image_url text,
  tags text[] not null default '{}',
  category text not null default 'General',
  forks integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.consumer_app_stats (
  app_id text primary key references public.consumer_apps (id) on delete cascade,
  favorites integer not null default 0,
  tryouts integer not null default 0,
  forks integer not null default 0
);

create table if not exists public.business_apps (
  id text primary key,
  name text not null,
  description text,
  url text not null default '',
  repo text,
  image_url text,
  tags text[] not null default '{}',
  category text not null default 'General',
  forks integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_app_stats (
  app_id text primary key references public.business_apps (id) on delete cascade,
  favorites integer not null default 0,
  tryouts integer not null default 0,
  forks integer not null default 0
);

alter table public.consumer_apps enable row level security;
alter table public.consumer_app_stats enable row level security;
alter table public.business_apps enable row level security;
alter table public.business_app_stats enable row level security;

create policy "public read consumer apps"
  on public.consumer_apps
  for select
  using (true);

create policy "public write consumer apps"
  on public.consumer_apps
  for all
  using (true)
  with check (true);

create policy "public read consumer stats"
  on public.consumer_app_stats
  for select
  using (true);

create policy "public write consumer stats"
  on public.consumer_app_stats
  for all
  using (true)
  with check (true);

create policy "public read business apps"
  on public.business_apps
  for select
  using (true);

create policy "public write business apps"
  on public.business_apps
  for all
  using (true)
  with check (true);

create policy "public read business stats"
  on public.business_app_stats
  for select
  using (true);

create policy "public write business stats"
  on public.business_app_stats
  for all
  using (true)
  with check (true);

insert into public.consumer_apps (id, name, description, url, repo, image_url, tags, category, forks)
values
  ('cv-tify', 'CV-tify', 'CV builder with polished templates, ATS-friendly structure, and quick export for job applications.', '', '', '', array['Nổi bật', 'Career', 'Tools'], 'Career', 640),
  ('each-other-understanding', 'Each Other Understanding', 'A guided relationship journal for couples and friends to reflect, compare answers, and grow closer.', '', '', '', array['Nổi bật', 'Social', 'Journal'], 'Social', 910),
  ('giftgave', 'GiftGave', 'Gift planner with shared wishlists, occasion reminders, and a calm design for thoughtful giving.', '', '', '', array['Lifestyle', 'Sharing'], 'Lifestyle', 310),
  ('cloudpaste', 'CloudPaste', 'Minimal paste storage for snippets, notes, and quick links, with one-tap sharing across devices.', '', '', '', array['Productivity', 'Sync'], 'Productivity', 1230),
  ('debtdiv', 'DebtDiv', 'A friendly debt tracker that splits payments, visualizes progress, and keeps repayment plans simple.', '', '', '', array['Finance', 'Planning'], 'Finance', 275)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  url = excluded.url,
  repo = excluded.repo,
  image_url = excluded.image_url,
  tags = excluded.tags,
  category = excluded.category,
  forks = excluded.forks;

insert into public.consumer_app_stats (app_id, favorites, tryouts, forks)
values
  ('cv-tify', 8200, 24100, 640),
  ('each-other-understanding', 10900, 35200, 910),
  ('giftgave', 6900, 17700, 310),
  ('cloudpaste', 12400, 41800, 1230),
  ('debtdiv', 5600, 14900, 275)
on conflict (app_id) do update set
  favorites = excluded.favorites,
  tryouts = excluded.tryouts,
  forks = excluded.forks;
