-- ── LIMPIAR DATOS DE PRUEBA DEL DÍA 1 ─────────────────────────────
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- Durante la verificación del Día 1 se creó un participante de prueba
-- (DNI 99990001, "PRUEBA DIA1 TEST") con su asistencia, actividades
-- exploradas y cuestionario. El RLS impide borrarlo con la clave anónima.
--
-- Orden: primero las tablas con FK, luego USUARIOS.

delete from public.CUESTIONARIOS_1 where DNI = '99990001';
delete from public.DIA_1_ACTIVIDADES where DNI = '99990001';
delete from public.ASISTENCIA where DNI = '99990001';
delete from public.USUARIOS where dni = '99990001';

-- Verificación: las cuatro consultas deben devolver 0 filas.
select 'CUESTIONARIOS_1' as tabla, count(*) from public.CUESTIONARIOS_1 where DNI = '99990001'
union all
select 'DIA_1_ACTIVIDADES', count(*) from public.DIA_1_ACTIVIDADES where DNI = '99990001'
union all
select 'ASISTENCIA', count(*) from public.ASISTENCIA where DNI = '99990001'
union all
select 'USUARIOS', count(*) from public.USUARIOS where dni = '99990001';
