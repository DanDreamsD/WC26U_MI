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
  DIA1?: string | null;
  DIA2?: string | null;
  DIA3?: string | null;
  DIA4?: string | null;
  DIA5?: string | null;
}

export interface SupabaseProgresoRecord {
  dni: string;
  xp?: number;
  nivel?: number;
  asistencias?: number[];
  quiz_scores?: Record<string, number>;
  quizzes?: number[];
  explorados?: string[];
  nodos?: string[];
  insignias?: string[];
  actualizado?: string;
}

export interface SupabaseDiaActividadesRecord {
  id?: number;
  DNI: string;
  created_at?: string;
  act_d1_numero_musical?: number;
  act_d1_inauguracion?: number;
  act_d1_empleabilidad?: number;
  act_d1_liderazgo?: number;
  act_d1_meet_greet?: number;
  act_d1_almuerzo?: number;
  act_d1_marca_personal?: number;
  act_d1_competencias?: number;
  act_d1_noche_cultural?: number;
  act_d2_visitas_tecnicas?: number;
  act_d2_almuerzo?: number;
  act_d2_historias_liderazgo?: number;
  act_d2_ponencia?: number;
  act_d2_feria_voluntariados?: number;
  act_d2_meet_greet?: number;
  act_d3_visita_tecnica?: number;
  act_d3_almuerzo?: number;
  act_d3_feria_laboral?: number;
  act_d3_supply_chain_challenge?: number;
  act_d3_logistica?: number;
  act_d3_coffee_break?: number;
  act_d4_visita_tecnica?: number;
  act_d4_supply_chain?: number;
  act_d4_design_thinking?: number;
  act_d5_recepcion?: number;
  act_d5_innovar_tecnologia?: number;
  act_d5_transformacion_digital?: number;
  act_d5_buffet_fotos?: number;
  act_d5_design_thinking?: number;
  act_d5_cierre?: number;
  act_d5_concierto?: number;
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
      PROGRESO: {
        Row: SupabaseProgresoRecord;
        Insert: SupabaseProgresoRecord;
        Update: Partial<SupabaseProgresoRecord>;
      };
      DIA_1_ACTIVIDADES: {
        Row: SupabaseDiaActividadesRecord;
        Insert: SupabaseDiaActividadesRecord;
        Update: Partial<SupabaseDiaActividadesRecord>;
      };
      DIA_2_ACTIVIDADES: {
        Row: SupabaseDiaActividadesRecord;
        Insert: SupabaseDiaActividadesRecord;
        Update: Partial<SupabaseDiaActividadesRecord>;
      };
      DIA_3_ACTIVIDADES: {
        Row: SupabaseDiaActividadesRecord;
        Insert: SupabaseDiaActividadesRecord;
        Update: Partial<SupabaseDiaActividadesRecord>;
      };
      DIA_4_ACTIVIDADES: {
        Row: SupabaseDiaActividadesRecord;
        Insert: SupabaseDiaActividadesRecord;
        Update: Partial<SupabaseDiaActividadesRecord>;
      };
      DIA_5_ACTIVIDADES: {
        Row: SupabaseDiaActividadesRecord;
        Insert: SupabaseDiaActividadesRecord;
        Update: Partial<SupabaseDiaActividadesRecord>;
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
