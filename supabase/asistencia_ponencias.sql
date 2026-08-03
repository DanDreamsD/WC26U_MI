-- ── ASISTENCIA_PONENCIAS ───────────────────────────────────────────
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- Tabla para registrar la asistencia a cada ponencia mediante una
-- palabra clave única por ponencia (PONCEIISE-01..08).
-- Una fila por participante (dni) y ponencia (keyword).

create table if not exists public.ASISTENCIA_PONENCIAS (
  id         bigint generated always as identity primary key,
  dni        text        not null,
  keyword    text        not null,
  created_at timestamptz not null default now(),
  constraint asistencia_ponencias_dni_keyword_unique unique (dni, keyword)
);

alter table public.ASISTENCIA_PONENCIAS enable row level security;

create policy "ASISTENCIA_PONENCIAS lectura para todos"
  on public.ASISTENCIA_PONENCIAS for select
  using (true);

create policy "ASISTENCIA_PONENCIAS insercion para todos"
  on public.ASISTENCIA_PONENCIAS for insert
  with check (true);
