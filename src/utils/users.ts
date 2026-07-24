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

const createReviewerUser = (): AppUser => ({
  id: 'reviewer-profile',
  documentId: TESTER_DOCUMENT_ID,
  name: 'Perfil de revisión',
  university: 'CEIISE',
  career: 'Revisión / QA',
  ticketType: 'VIP',
  level: 10,
  xp: 1200,
  completedMissions: ['m1', 'm2', 'm3', 'm4'],
  unlockedNodes: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9'],
  badges: ['b1', 'b2', 'b3']
});

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

const getSupabaseHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    accept: 'application/json',
  };

  if (SUPABASE_ANON_KEY) {
    headers.apikey = SUPABASE_ANON_KEY;
    headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
  }

  return headers;
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

  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=*&dni=eq.${encodeURIComponent(documentId)}`;
  const response = await fetch(url, {
    headers: getSupabaseHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed with status ${response.status}`);
  }

  const records = (await response.json()) as SupabaseUserRecord[];
  const record = records[0];

  return record ? mapSupabaseRecordToAppUser(record) : null;
};

export const loginHint = `Supabase ${SUPABASE_TABLE} • busca por DNI • ID de revisión: ${TESTER_DOCUMENT_ID}`;
