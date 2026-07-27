import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) ?? 'https://weajzsivyuangtpofycp.supabase.co';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ?? '';

export interface SupabaseUserRecord {
  id: string | number;
  created_at?: string;
  nombres?: string;
  correo?: string;
  dni?: string;
  acceso?: string;
  nivel?: string | number;
  progreso?: string | number;
  certificado?: string;
  phone?: string;
}

export interface SupabaseAsistenciaRecord {
  id: string | number;
  created_at?: string;
  dni?: string;
  keyword?: string;
}

export interface Database {
  public: {
    Tables: {
      USUARIOS: {
        Row: SupabaseUserRecord;
        Insert: Partial<SupabaseUserRecord>;
        Update: Partial<SupabaseUserRecord>;
      };
      ASISTENCIA: {
        Row: SupabaseAsistenciaRecord;
        Insert: SupabaseAsistenciaRecord;
        Update: Partial<SupabaseAsistenciaRecord>;
      };
    };
  };
}

let _supabase: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      'Falta la clave anónima de Supabase. Define VITE_SUPABASE_ANON_KEY en tu archivo .env'
    );
  }
  if (!_supabase) {
    _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return _supabase;
};
