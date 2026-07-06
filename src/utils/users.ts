import usersConfig from '../data/users.json';
import csvData from '../data/BD DE PRUEBAS.csv?raw';

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

interface UsersConfig {
  sourceCsv?: string;
  documentIdField?: string;
}

const config = usersConfig as UsersConfig;
const SOURCE_CSV = config.sourceCsv ?? 'BD DE PRUEBAS.csv';
const DOCUMENT_ID_FIELD = config.documentIdField ?? 'DOCUMENTO DE IDENTIDAD';
const TESTER_DOCUMENT_ID = '99999999';

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

const normalizeText = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

const normalizeDocument = (value: string) => value.replace(/\D/g, '');

const normalizeTicket = (value: string): AppUser['ticketType'] => {
  const normalized = normalizeText(value);

  if (normalized === 'vip') return 'VIP';
  if (normalized === 'premium') return 'PREMIUM';
  if (normalized === 'estandar' || normalized === 'standard') return 'STANDARD';

  return 'STANDARD';
};

const parseCsvLine = (line: string): string[] => {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ';' && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
};

const parseCsv = (raw: string) => {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header] = values[index] ?? '';
      return acc;
    }, {});
  });
};

export const getUsersFromCsv = (): AppUser[] => {
  const rows = parseCsv(csvData);
  return rows
    .filter((row) => row[DOCUMENT_ID_FIELD])
    .map((row, index) => {
      const documentId = normalizeDocument(row[DOCUMENT_ID_FIELD] ?? '');

      const accessValue = row.ACCESO ?? row.TIPO ?? '';

      return {
        id: documentId || `user-${index + 1}`,
        documentId,
        name: [row.NOMBRES ?? '', row.APELLIDOS ?? ''].filter(Boolean).join(' ').trim(),
        university: row['UNIVERSIDAD / INSTITUCIÓN'] ?? '',
        career: row.CARRERA ?? '',
        ticketType: normalizeTicket(accessValue),
        level: 1,
        xp: 0,
        completedMissions: [],
        unlockedNodes: [],
        badges: []
      };
    });
};

export const findUserByDocument = (documentInput: string): AppUser | null => {
  const documentId = normalizeDocument(documentInput);

  if (!documentId) {
    return null;
  }

  if (documentId === TESTER_DOCUMENT_ID) {
    return createReviewerUser();
  }

  return getUsersFromCsv().find((user) => user.documentId === documentId) ?? null;
};

export const loginHint = `${SOURCE_CSV} • usa el campo ${DOCUMENT_ID_FIELD} • ID de revisión: ${TESTER_DOCUMENT_ID}`;
