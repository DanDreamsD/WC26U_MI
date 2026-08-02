-- ── PROGRESO ────────────────────────────────────────────────────────────
-- Progreso de gamificación por participante (fuente de verdad de la app).
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- NOTA: igual que USUARIOS/ASISTENCIA, se usa la clave anónima del cliente,
-- por lo que las políticas RLS son permisivas. Si más adelante se usa Auth
-- real, reemplázalas por políticas basadas en auth.uid().

-- El DNI debe ser único en USUARIOS para poder referenciarlo.
create unique index if not exists usuarios_dni_unique on public.USUARIOS (dni);

create table if not exists public.PROGRESO (
  dni         text primary key references public.USUARIOS (dni),
  xp          integer     not null default 0,
  nivel       integer     not null default 1,
  asistencias integer[]   not null default '{}',
  quiz_scores jsonb       not null default '{}',
  quizzes     integer[]   not null default '{}',
  explorados  text[]      not null default '{}',
  nodos       text[]      not null default '{}',
  insignias   text[]      not null default '{}',
  actualizado timestamptz not null default now()
);

alter table public.PROGRESO enable row level security;

create policy "PROGRESO lectura para todos"
  on public.PROGRESO for select
  using (true);

create policy "PROGRESO insercion para todos"
  on public.PROGRESO for insert
  with check (true);

create policy "PROGRESO actualizacion para todos"
  on public.PROGRESO for update
  using (true)
  with check (true);
