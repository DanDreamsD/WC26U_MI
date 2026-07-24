import { createFullProgress } from './gamificationStore';
import { createClient } from '@supabase/supabase-js';

export interface AppUser {
  id: string;
  documentId: string;
  name: string;
  university: string;
  career: string;
  ticketType: 'STANDARD' | 'VIP' | 'PREMIUM';
  level: number;
  xp: number;
  completedMissions: string[];
  unlockedNodes: string[];
  badges: string[];
}

export const TESTER_DOCUMENT_ID = '99999999';

const createReviewerUser = (): AppUser => {
  const progress = createFullProgress(TESTER_DOCUMENT_ID);
  return {
    id: 'reviewer-profile',
    documentId: TESTER_DOCUMENT_ID,
    name: 'Perfil de revisión',
    university: 'CEIISE',
    career: 'Revisión / QA',
    ticketType: 'VIP',
    level: progress.level,
    xp: progress.xp,
    completedMissions: progress.quizzesCompleted.map((d) => `quiz-d${d}`),
    unlockedNodes: [...progress.unlockedNodes],
    badges: [...progress.earnedBadges]
  };
};

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) ?? 'https://weajzsivyuangtpofycp.supabase.co';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ?? '';
const SUPABASE_TABLE = 'USUARIOS';

interface SupabaseUserRecord {
  id: string;
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

type Database = {
  USUARIOS: SupabaseUserRecord;
};

// Lazy-initialize Supabase client: avoids crashing the app at import time
// when the anon key is not yet configured.
let _supabase: ReturnType<typeof createClient<Database>> | null = null;

const getSupabase = () => {
  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      'Falta la clave anónima de Supabase. Define VITE_SUPABASE_ANON_KEY en tu archivo .env'
    );
  }
  if (!_supabase) {
    _supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return _supabase;
};

const normalizeText = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

const normalizeDocument = (value: string) => value.replace(/\D/g, '');

const normalizeTicket = (value: string): AppUser['ticketType'] => {
  const normalized = normalizeText(value || '');

  if (normalized.includes('vip')) return 'VIP';
  if (normalized.includes('premium')) return 'PREMIUM';
  if (normalized.includes('estandar') || normalized.includes('standard')) return 'STANDARD';

  return 'STANDARD';
};

const normalizeProgress = (value: string | number | undefined): number => {
  if (typeof value === 'number') return value;
  if (!value) return 0;

  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const mapSupabaseRecordToAppUser = (record: SupabaseUserRecord): AppUser => ({
  id: record.id || record.dni || 'unknown-user',
  documentId: normalizeDocument(record.dni ?? ''),
  name: record.nombres?.trim() ?? 'Participante',
  university: '',
  career: '',
  ticketType: normalizeTicket(record.acceso ?? ''),
  level: Number(record.nivel ?? 1) || 1,
  xp: normalizeProgress(record.progreso),
  completedMissions: [],
  unlockedNodes: [],
  badges: []
});

export const findUserByDocument = async (documentInput: string): Promise<AppUser | null> => {
  const documentId = normalizeDocument(documentInput);

  if (!documentId) {
    return null;
  }

  if (documentId === TESTER_DOCUMENT_ID) {
    return createReviewerUser();
  }

  const client = getSupabase();

  const { data, error, status } = await client
    .from('USUARIOS')
    .select('*')
    .eq('dni', documentId)
    .limit(1)
    .single();

  if (error) {
    throw new Error(`Supabase query failed [${status}]: ${error.message}`);
  }

  return data ? mapSupabaseRecordToAppUser(data) : null;
};

export const loginHint = `Supabase ${SUPABASE_TABLE} • busca por DNI • ID de revisión: ${TESTER_DOCUMENT_ID}`;
