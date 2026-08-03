import { getSupabase } from './supabaseClient';
import { REVIEWER_DOCUMENT_ID } from './gamificationStore';

const dayColumn = (day: number): string => `DIA${day}`;

export const hasPonenciaAttendance = async (
  documentId: string,
  column: string
): Promise<boolean> => {
  if (!documentId || !column) return false;
  try {
    const client = getSupabase();

    const { data: userRow } = await (client as any)
      .from('USUARIOS')
      .select('id')
      .eq('dni', documentId)
      .limit(1)
      .maybeSingle();

    if (!userRow?.id) return false;

    const { data, error } = await (client as any)
      .from('ASISTENCIA')
      .select(column)
      .eq('id', userRow.id)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error al verificar asistencia de ponencia:', error);
      return false;
    }
    return !!(data && data[column]);
  } catch (error) {
    console.error('Error al verificar asistencia de ponencia:', error);
    return false;
  }
};

export const savePonenciaAttendance = async ({
  documentId,
  column,
  keyword,
}: {
  documentId: string;
  column: string;
  keyword: string;
}) => {
  if (documentId === REVIEWER_DOCUMENT_ID) {
    return {
      success: true,
      message: 'Modo revisión: no se registró la asistencia en la base de datos.',
    };
  }
  try {
    const client = getSupabase();

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

    const { error: insertError } = await (client as any)
      .from('ASISTENCIA')
      .upsert(
        {
          id: userRow.id,
          DNI: documentId,
          [column]: keyword,
        },
        { onConflict: 'id' }
      );

    if (insertError) {
      console.error('Error al registrar asistencia de ponencia en Supabase:', insertError);
      return {
        success: false,
        message: `Error en la base de datos ASISTENCIA: ${insertError.message}`,
      };
    }

    return {
      success: true,
      message: 'Asistencia a la ponencia registrada correctamente.',
    };
  } catch (error: any) {
    console.error('Error general al registrar asistencia de ponencia:', error);
    return {
      success: false,
      message: error?.message ?? 'Error inesperado al conectar con la base de datos.',
    };
  }
};

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
            documentId: row.DNI || String(row.id),
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
  day?: number
): Promise<boolean> => {
  if (!documentId) return false;

  try {
    const client = getSupabase();

    const { data: userRow } = await (client as any)
      .from('USUARIOS')
      .select('id')
      .eq('dni', documentId)
      .limit(1)
      .maybeSingle();

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
        return !!data[dayColumn(day)];
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
  day,
  keyword,
}: {
  documentId: string;
  day: number;
  keyword: string;
}) => {
  if (documentId === REVIEWER_DOCUMENT_ID) {
    return {
      success: true,
      message: 'Modo revisión: no se registró la asistencia en la base de datos.',
    };
  }
  try {
    const client = getSupabase();

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

    const { error: insertError } = await (client as any)
      .from('ASISTENCIA')
      .upsert(
        {
          id: userRow.id,
          DNI: documentId,
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
