-- ── CUESTIONARIOS_4 y CUESTIONARIOS_5 (RLS permisivo) ──────────────
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- Las tablas CUESTIONARIOS_4 y CUESTIONARIOS_5 ya existen y ya tienen
-- RLS habilitado con política de LECTURA, pero NO tienen políticas de
-- INSERCIÓN ni ACTUALIZACIÓN, por lo que el guardado de resultados falla
-- con el error 42501 "new row violates row-level security policy".
--
-- Este script agrega las políticas permisivas de INSERT y UPDATE,
-- igual que las de CUESTIONARIOS_1.

create policy "CUESTIONARIOS_4 insercion para todos"
  on public.CUESTIONARIOS_4 for insert
  with check (true);

create policy "CUESTIONARIOS_4 actualizacion para todos"
  on public.CUESTIONARIOS_4 for update
  using (true)
  with check (true);

create policy "CUESTIONARIOS_5 insercion para todos"
  on public.CUESTIONARIOS_5 for insert
  with check (true);

create policy "CUESTIONARIOS_5 actualizacion para todos"
  on public.CUESTIONARIOS_5 for update
  using (true)
  with check (true);
