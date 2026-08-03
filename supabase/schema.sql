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

-- ── DIA_1_ACTIVIDADES ─────────────────────────────────────────────
-- Matriz binaria: una columna por actividad del Día 1 (TRUE = explorada).
-- Piloto de la tabla ancha por actividad. Requiere USUARIOS.dni único.

create table if not exists public.DIA_1_ACTIVIDADES (
  dni                 text primary key references public.USUARIOS (dni),
  act_d1_numero_musical  boolean not null default false,
  act_d1_inauguracion    boolean not null default false,
  act_d1_empleabilidad   boolean not null default false,
  act_d1_liderazgo       boolean not null default false,
  act_d1_meet_greet      boolean not null default false,
  act_d1_almuerzo        boolean not null default false,
  act_d1_marca_personal  boolean not null default false,
  act_d1_competencias    boolean not null default false,
  act_d1_noche_cultural  boolean not null default false
);

alter table public.DIA_1_ACTIVIDADES enable row level security;

create policy "DIA_1_ACTIVIDADES lectura para todos"
  on public.DIA_1_ACTIVIDADES for select
  using (true);

create policy "DIA_1_ACTIVIDADES insercion para todos"
  on public.DIA_1_ACTIVIDADES for insert
  with check (true);

create policy "DIA_1_ACTIVIDADES actualizacion para todos"
  on public.DIA_1_ACTIVIDADES for update
  using (true)
  with check (true);
