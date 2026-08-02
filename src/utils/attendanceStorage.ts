import { getSupabase } from './supabaseClient';

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
    return (data || []).map((row: any) => ({
      documentId: row.dni || String(row.id),
      day: 1,
      keyword: row.keyword || '',
      registeredAt: row.created_at || new Date().toISOString(),
      id: row.id,
    }));
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

    // 1. Buscar en USUARIOS su 'id' con el 'dni'
    const { data: userRow } = await (client as any)
      .from('USUARIOS')
      .select('id')
      .eq('dni', documentId)
      .limit(1)
      .maybeSingle();

    const userId = userRow?.id;

    // 2. Verificar en la tabla ASISTENCIA por 'id' o 'dni'
    let query = (client as any).from('ASISTENCIA').select('*');

    if (userId !== undefined && userId !== null) {
      query = query.eq('id', userId);
    } else {
      query = query.eq('dni', documentId);
    }

    if (keyword) {
      query = query.eq('keyword', keyword);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error al verificar asistencia en Supabase ASISTENCIA:', error);
    } else if (data && data.length > 0) {
      return true;
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

    const userId = userRow.id;

    // 2. Registrar el 'id' en la base de datos 'ASISTENCIA' (junto con dni y palabra clave)
    const { error: insertError } = await (client as any)
      .from('ASISTENCIA')
      .insert([
        {
          id: userId,
          dni: documentId,
          keyword: keyword,
        },
      ]);

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
