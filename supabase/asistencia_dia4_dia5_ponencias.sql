-- ── COLUMNAS PONENCIA DÍA 4 Y DÍA 5 ──────────────────────────────
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- Agrega las columnas de palabra clave de ponencias/talleres de los
-- Días 4 y 5 a la tabla ASISTENCIA (que solo tenía DIA1_P1..P3,
-- DIA2_P1 y DIA3_P1).

alter table public.ASISTENCIA
  add column if not exists DIA4_P1 text,
  add column if not exists DIA4_P2 text,
  add column if not exists DIA5_P1 text,
  add column if not exists DIA5_T1 text;
