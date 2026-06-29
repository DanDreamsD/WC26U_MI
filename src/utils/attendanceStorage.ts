export interface AttendanceRecord {
  documentId: string;
  day: number;
  keyword: string;
  registeredAt: string;
}

// URL de la Web App de Google Apps Script. 
// Se carga desde las variables de entorno de Vite (ej. en archivo .env).
const ATTENDANCE_API_URL = import.meta.env.VITE_ATTENDANCE_API_URL || '';

export const getAttendanceRecords = async (): Promise<AttendanceRecord[]> => {
  if (!ATTENDANCE_API_URL) {
    throw new Error('La URL de la API de Google Sheets no está configurada.');
  }

  const response = await fetch(`${ATTENDANCE_API_URL}?action=getall`);
  if (!response.ok) {
    throw new Error('No se pudo cargar la base de asistencias desde Google Sheets.');
  }

  return response.json();
};

export const hasAttendanceRecord = async (documentId: string, day: number) => {
  if (!ATTENDANCE_API_URL) {
    return false;
  }

  try {
    const response = await fetch(
      `${ATTENDANCE_API_URL}?action=check&documentId=${encodeURIComponent(documentId)}&day=${day}`
    );
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return Boolean(data.exists);
  } catch (error) {
    console.error('Error al verificar la asistencia en Google Sheets:', error);
    return false;
  }
};

export const saveAttendanceRecord = async ({
  documentId,
  day,
  keyword
}: {
  documentId: string;
  day: number;
  keyword: string;
}) => {
  if (!ATTENDANCE_API_URL) {
    return { success: false, message: 'La URL de la API de Google Sheets no está configurada.' };
  }

  try {
    const response = await fetch(ATTENDANCE_API_URL, {
      method: 'POST',
      // Usamos text/plain para evitar el preflight de CORS que Google Apps Script rechaza de forma nativa.
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ documentId, day, keyword })
    });

    if (!response.ok) {
      return { success: false, message: 'Error de comunicación con Google Sheets.' };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al registrar la asistencia en Google Sheets:', error);
    return { success: false, message: 'Error al intentar conectar con la base de datos.' };
  }
};

export const exportAttendanceCsv = async () => {
  const records = await getAttendanceRecords();
  const headers = ['documentId', 'day', 'keyword', 'registeredAt'];
  const lines = [headers.join(',')];

  records.forEach((record) => {
    lines.push([record.documentId, record.day, record.keyword, record.registeredAt].join(','));
  });

  return lines.join('\n');
};

export const downloadAttendanceCsv = async (filename = 'asistencias_ceiise.csv') => {
  const csvContent = await exportAttendanceCsv();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};
