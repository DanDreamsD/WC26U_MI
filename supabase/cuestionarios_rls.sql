-- ── CUESTIONARIOS_N (RLS permisivo) ──────────────────────────────
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- Las tablas CUESTIONARIOS_1..5 almacenan el resultado del cuestionario
-- de cada día: una fila por participante (DNI, DIA, Q1..Q10 = 0/1 por
-- pregunta y TOTAL = aciertos). Se usan con la clave anónima del cliente,
-- por lo que las políticas RLS son permisivas.

alter table public.CUESTIONARIOS_1 enable row level security;

create policy "CUESTIONARIOS_1 lectura para todos"
  on public.CUESTIONARIOS_1 for select
  using (true);

create policy "CUESTIONARIOS_1 insercion para todos"
  on public.CUESTIONARIOS_1 for insert
  with check (true);

create policy "CUESTIONARIOS_1 actualizacion para todos"
  on public.CUESTIONARIOS_1 for update
  using (true)
  with check (true);

create policy "CUESTIONARIOS_1 borrado para todos"
  on public.CUESTIONARIOS_1 for delete
  using (true);
