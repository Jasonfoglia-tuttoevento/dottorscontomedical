-- FACILE MEDICAL — analitiche di visibilità cliniche
-- Raccoglie solo eventi pseudonimi; nessun IP, nome, email o dato sanitario.

create extension if not exists pgcrypto;

create table if not exists public.clinic_analytics_events (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  event_type text not null check (
    event_type in (
      'profile_view',
      'phone_click',
      'email_click',
      'website_click',
      'request_click'
    )
  ),
  visitor_id text not null check (char_length(visitor_id) between 8 and 128),
  session_id text not null check (char_length(session_id) between 8 and 128),
  page_path text,
  referrer text,
  occurred_at timestamptz not null default now()
);

create index if not exists clinic_analytics_events_clinic_occurred_idx
  on public.clinic_analytics_events (clinic_id, occurred_at desc);

create index if not exists clinic_analytics_events_clinic_event_idx
  on public.clinic_analytics_events (clinic_id, event_type, occurred_at desc);

create index if not exists clinic_analytics_events_visitor_idx
  on public.clinic_analytics_events (clinic_id, visitor_id, occurred_at desc);

alter table public.clinic_analytics_events enable row level security;
revoke all on table public.clinic_analytics_events from anon, authenticated;

create or replace function public.track_clinic_event(
  p_clinic_id uuid,
  p_event_type text,
  p_visitor_id text,
  p_session_id text,
  p_page_path text default null,
  p_referrer text default null
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if p_event_type not in (
    'profile_view',
    'phone_click',
    'email_click',
    'website_click',
    'request_click'
  ) then
    raise exception 'invalid_event_type' using errcode = '22023';
  end if;

  if char_length(coalesce(p_visitor_id, '')) not between 8 and 128
     or char_length(coalesce(p_session_id, '')) not between 8 and 128 then
    raise exception 'invalid_analytics_identifier' using errcode = '22023';
  end if;

  if not exists (
    select 1
    from public.clinics c
    where c.id = p_clinic_id
      and c.verified = true
  ) then
    return;
  end if;

  -- Evita doppi eventi prodotti da doppio click, refresh o retry di rete.
  if exists (
    select 1
    from public.clinic_analytics_events e
    where e.clinic_id = p_clinic_id
      and e.session_id = left(p_session_id, 128)
      and e.event_type = p_event_type
      and e.occurred_at > now() - interval '20 seconds'
  ) then
    return;
  end if;

  insert into public.clinic_analytics_events (
    clinic_id,
    event_type,
    visitor_id,
    session_id,
    page_path,
    referrer
  )
  values (
    p_clinic_id,
    p_event_type,
    left(p_visitor_id, 128),
    left(p_session_id, 128),
    nullif(left(coalesce(p_page_path, ''), 300), ''),
    nullif(left(coalesce(p_referrer, ''), 500), '')
  );
end;
$$;

revoke all on function public.track_clinic_event(uuid, text, text, text, text, text) from public;
grant execute on function public.track_clinic_event(uuid, text, text, text, text, text) to anon, authenticated;

create or replace function public.get_clinic_analytics_summary(
  p_clinic_id uuid,
  p_days integer default 30
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_days integer := least(greatest(coalesce(p_days, 30), 7), 90);
  v_current_start timestamptz;
  v_previous_start timestamptz;
begin
  if auth.uid() is null or not exists (
    select 1
    from public.clinics c
    where c.id = p_clinic_id
      and (
        c.owner_id = auth.uid()
        or exists (
          select 1
          from public.profiles p
          where p.id = auth.uid()
            and p.role::text = 'admin'
        )
      )
  ) then
    raise exception 'not_authorized' using errcode = '42501';
  end if;

  v_current_start := now() - make_interval(days => v_days);
  v_previous_start := now() - make_interval(days => v_days * 2);

  return (
    with metrics as (
      select
        count(*) filter (
          where event_type = 'profile_view'
            and occurred_at >= v_current_start
        )::bigint as views,
        count(distinct visitor_id) filter (
          where event_type = 'profile_view'
            and occurred_at >= v_current_start
        )::bigint as unique_visitors,
        count(*) filter (
          where event_type <> 'profile_view'
            and occurred_at >= v_current_start
        )::bigint as clicks,
        count(*) filter (
          where event_type = 'phone_click'
            and occurred_at >= v_current_start
        )::bigint as phone_clicks,
        count(*) filter (
          where event_type = 'email_click'
            and occurred_at >= v_current_start
        )::bigint as email_clicks,
        count(*) filter (
          where event_type = 'website_click'
            and occurred_at >= v_current_start
        )::bigint as website_clicks,
        count(*) filter (
          where event_type = 'request_click'
            and occurred_at >= v_current_start
        )::bigint as request_clicks,
        count(*) filter (
          where event_type = 'profile_view'
            and occurred_at >= v_previous_start
            and occurred_at < v_current_start
        )::bigint as previous_views,
        count(distinct visitor_id) filter (
          where event_type = 'profile_view'
            and occurred_at >= v_previous_start
            and occurred_at < v_current_start
        )::bigint as previous_unique_visitors,
        count(*) filter (
          where event_type <> 'profile_view'
            and occurred_at >= v_previous_start
            and occurred_at < v_current_start
        )::bigint as previous_clicks,
        min(occurred_at) as tracking_since
      from public.clinic_analytics_events
      where clinic_id = p_clinic_id
        and occurred_at >= v_previous_start
    )
    select jsonb_build_object(
      'days', v_days,
      'views', views,
      'uniqueVisitors', unique_visitors,
      'clicks', clicks,
      'phoneClicks', phone_clicks,
      'emailClicks', email_clicks,
      'websiteClicks', website_clicks,
      'requestClicks', request_clicks,
      'previousViews', previous_views,
      'previousUniqueVisitors', previous_unique_visitors,
      'previousClicks', previous_clicks,
      'clickThroughRate', case
        when views = 0 then 0
        else round((clicks::numeric * 100) / views, 1)
      end,
      'trackingSince', tracking_since
    )
    from metrics
  );
end;
$$;

revoke all on function public.get_clinic_analytics_summary(uuid, integer) from public;
grant execute on function public.get_clinic_analytics_summary(uuid, integer) to authenticated;

create or replace function public.get_clinic_analytics_daily(
  p_clinic_id uuid,
  p_days integer default 30
)
returns table (
  day date,
  views bigint,
  unique_visitors bigint,
  clicks bigint
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_days integer := least(greatest(coalesce(p_days, 30), 7), 90);
begin
  if auth.uid() is null or not exists (
    select 1
    from public.clinics c
    where c.id = p_clinic_id
      and (
        c.owner_id = auth.uid()
        or exists (
          select 1
          from public.profiles p
          where p.id = auth.uid()
            and p.role::text = 'admin'
        )
      )
  ) then
    raise exception 'not_authorized' using errcode = '42501';
  end if;

  return query
  with calendar as (
    select generate_series(
      current_date - (v_days - 1),
      current_date,
      interval '1 day'
    )::date as series_day
  )
  select
    calendar.series_day as day,
    count(events.id) filter (
      where events.event_type = 'profile_view'
    )::bigint as views,
    count(distinct events.visitor_id) filter (
      where events.event_type = 'profile_view'
    )::bigint as unique_visitors,
    count(events.id) filter (
      where events.event_type <> 'profile_view'
    )::bigint as clicks
  from calendar
  left join public.clinic_analytics_events events
    on events.clinic_id = p_clinic_id
   and events.occurred_at >= calendar.series_day::timestamptz
   and events.occurred_at < (calendar.series_day + 1)::timestamptz
  group by calendar.series_day
  order by calendar.series_day;
end;
$$;

revoke all on function public.get_clinic_analytics_daily(uuid, integer) from public;
grant execute on function public.get_clinic_analytics_daily(uuid, integer) to authenticated;
notify pgrst, 'reload schema';
