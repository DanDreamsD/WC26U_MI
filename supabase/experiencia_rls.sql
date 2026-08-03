-- ── FIX EXPERIENCIA ────────────────────────────────────────────────
-- Ejecuta este script en el Editor SQL de Supabase.
--
-- 1) Habilita políticas RLS permisivas (SELECT/INSERT) en EXPERIENCIA,
--    igual que las otras tablas (la app escribe con la clave anónima
--    y hoy la tabla rechaza el INSERT).
-- 2) Garantiza que `id` tenga valor por defecto (idempotente).

alter table public.EXPERIENCIA enable row level security;

create policy "EXPERIENCIA lectura para todos"
  on public.EXPERIENCIA for select
  using (true);

create policy "EXPERIENCIA insercion para todos"
  on public.EXPERIENCIA for insert
  with check (true);

do $$
declare
  v_has_default boolean;
  v_max_id bigint;
  v_seq text;
begin
  select coalesce(a.attidentity <> '', false) or a.atthasdef
    into v_has_default
    from pg_attribute a
    join pg_class c on c.oid = a.attrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'EXPERIENCIA' and a.attname = 'id';

  if not coalesce(v_has_default, false) then
    v_seq := 'EXPERIENCIA_id_seq';
    execute format('create sequence if not exists %I', v_seq);
    execute format('select coalesce(max(id), 0) from public.EXPERIENCIA') into v_max_id;
    perform setval(v_seq, v_max_id + 1, false);
    execute format('alter sequence %I owned by public.EXPERIENCIA.id', v_seq);
    execute format('alter table public.EXPERIENCIA alter column id set default nextval(%L)', v_seq);
  end if;
end $$;
