-- ── FIX DIA_2..5_ACTIVIDADES ─────────────────────────────────────────
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- 1) Habilita políticas RLS permisivas (SELECT/INSERT/UPDATE) en las
--    tablas DIA_2..5, igual que DIA_1_ACTIVIDADES (la app escribe con
--    la clave anónima y hoy esas tablas rechazan el INSERT).
-- 2) Garantiza que `id` tenga valor por defecto (idempotente).
--
-- NOTA: las columnas de la app ya coinciden con las de la BD (el Día 2
-- usa "act_d2_historias_liderazgo"), no hace falta renombrar nada.

-- 1 + 2. RLS permisiva y default de `id` para cada tabla
do $$
declare
  t text;
  a text;
  polname text;
  v_has_default boolean;
  v_max_id bigint;
  v_seq text;
begin
  foreach t in array array['DIA_2_ACTIVIDADES','DIA_3_ACTIVIDADES','DIA_4_ACTIVIDADES','DIA_5_ACTIVIDADES'] loop
    execute format('alter table public.%I enable row level security', t);

    foreach a in array array['SELECT','INSERT','UPDATE'] loop
      polname := 'actividades_' || lower(a) || '_' || t;
      if not exists (
        select 1 from pg_policies
        where schemaname = 'public' and tablename = t and policyname = polname
      ) then
        execute format(
          'create policy %I on public.%I for %s using (true) with check (true)',
          polname, t, a
        );
      end if;
    end loop;

    -- Default de `id` si no existe (identity o default ya puesto → se omite)
    select coalesce(a.attidentity <> '', false) or a.atthasdef
      into v_has_default
      from pg_attribute a
      join pg_class c on c.oid = a.attrelid
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = t and a.attname = 'id';

    if not coalesce(v_has_default, false) then
      v_seq := t || '_id_seq';
      execute format('create sequence if not exists %I', v_seq);
      execute format('select coalesce(max(id), 0) from public.%I', t) into v_max_id;
      perform setval(v_seq, v_max_id + 1, false);
      execute format('alter sequence %I owned by public.%I.id', v_seq, t);
      execute format('alter table public.%I alter column id set default nextval(%L)', t, v_seq);
    end if;
  end loop;
end $$;
