import { getSupabase } from './supabaseClient';
import { attendanceKeywordsByDay } from './attendanceKeywords';

const KEYWORD_TO_DAY: Record<string, number> = Object.fromEntries(
  Object.entries(attendanceKeywordsByDay).map(([day, keyword]) => [keyword, Number(day)])
);

const dayColumn = (day: number): string => `DIA${day}`;

export interface AttendanceRecord {
  documentId: string;
  day: number;
  keyword: string;
  registeredAt: string;
  id?: number | string;
}

export const getAttendanceRecords = async (): Promise<AttendanceRecord[]> => {
  try {
    const client = getSupabase();
    const { data, error } = await (client as any).from('ASISTENCIA').select('*');
    if (error) {
      throw error;
    }
    return (data || []).flatMap((row: any) =>
      [1, 2, 3, 4, 5].flatMap((day) => {
        const keyword = row[dayColumn(day)];
        if (!keyword) return [];
        return [
          {
            documentId: row.dni || String(row.id),
            day,
            keyword,
            registeredAt: row.created_at || new Date().toISOString(),
            id: row.id,
          },
        ];
      })
    );
  } catch (error) {
    console.error('Error al cargar la base de asistencias desde Supabase:', error);
    return [];
  }
};

export const hasAttendanceRecord = async (
  documentId: string,
  keyword?: string
): Promise<boolean> => {
  if (!documentId) return false;

  try {
    const client = getSupabase();

    const day = keyword ? KEYWORD_TO_DAY[keyword] : undefined;

    // 1. Buscar en USUARIOS su 'id' con el 'dni'
    const { data: userRow } = await (client as any)
      .from('USUARIOS')
      .select('id')
      .eq('dni', documentId)
      .limit(1)
      .maybeSingle();

    // 2. Verificar en la tabla ASISTENCIA si la columna del día ya está registrada
    if (userRow?.id) {
      const { data, error } = await (client as any)
        .from('ASISTENCIA')
        .select('*')
        .eq('id', userRow.id)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error al verificar asistencia en Supabase ASISTENCIA:', error);
      } else if (data && day) {
        const value = data[dayColumn(day)];
        if (value) {
          return true;
        }
      } else if (data && !day) {
        return [1, 2, 3, 4, 5].some((d) => data[dayColumn(d)]);
      }
    }
  } catch (error) {
    console.error('Error al verificar la asistencia:', error);
  }

  return false;
};

export const saveAttendanceRecord = async ({
  documentId,
  keyword,
}: {
  documentId: string;
  keyword: string;
}) => {
  try {
    const client = getSupabase();

    // 1. Con el 'dni' buscar en la tabla 'USUARIOS' su 'id'
    const { data: userRow, error: userError } = await (client as any)
      .from('USUARIOS')
      .select('id')
      .eq('dni', documentId)
      .limit(1)
      .maybeSingle();

    if (userError || !userRow) {
      console.error('No se encontró el usuario en USUARIOS:', userError);
      return {
        success: false,
        message: `No se encontró un usuario registrado con el DNI ${documentId}.`,
      };
    }

    const day = KEYWORD_TO_DAY[keyword];
    if (!day) {
      return {
        success: false,
        message: 'La palabra clave no corresponde a ningún día del evento.',
      };
    }

    // 2. Registrar la asistencia llenando la columna del día con la keyword.
    //    El 'id' es la clave primaria y referencia a USUARIOS.id (1 fila por usuario).
    const { error: insertError } = await (client as any)
      .from('ASISTENCIA')
      .upsert(
        {
          id: userRow.id,
          dni: documentId,
          [dayColumn(day)]: keyword,
        },
        { onConflict: 'id' }
      );

    if (insertError) {
      console.error('Error al registrar asistencia en Supabase:', insertError);
      return {
        success: false,
        message: `Error en la base de datos ASISTENCIA: ${insertError.message}`,
      };
    }

    return {
      success: true,
      message: 'Asistencia registrada correctamente en la base de datos ASISTENCIA.',
    };
  } catch (error: any) {
    console.error('Error general al registrar la asistencia:', error);
    return {
      success: false,
      message: error?.message ?? 'Error inesperado al conectar con la base de datos.',
    };
  }
};

export const exportAttendanceCsv = async () => {
  const records = await getAttendanceRecords();
  const headers = ['id', 'documentId', 'day', 'keyword', 'registeredAt'];
  const lines = [headers.join(',')];

  records.forEach((record) => {
    lines.push(
      [record.id || '', record.documentId, record.day, record.keyword, record.registeredAt].join(',')
    );
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
