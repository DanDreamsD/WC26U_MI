export interface AttendanceRecord {
  documentId: string;
  day: number;
  keyword: string;
  registeredAt: string;
}

const ATTENDANCE_API_URL = 'http://localhost:3001/attendance';

export const getAttendanceRecords = async (): Promise<AttendanceRecord[]> => {
  const response = await fetch(ATTENDANCE_API_URL);
  if (!response.ok) {
    throw new Error('No se pudo cargar la base de asistencias.');
  }

  return response.json();
};

export const hasAttendanceRecord = async (documentId: string, day: number) => {
  const response = await fetch(`${ATTENDANCE_API_URL}/${encodeURIComponent(documentId)}/${day}`);
  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return Boolean(data.exists);
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
  const response = await fetch(ATTENDANCE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentId, day, keyword })
  });

  const data = await response.json();
  return data;
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
