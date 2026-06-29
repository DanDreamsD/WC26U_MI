export type LevelStatus = 'completed' | 'available' | 'locked';

const parseLevelDate = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const getPeruDateAsUTC = (date: Date): Date => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  const parts = formatter.formatToParts(date);
  const year = Number(parts.find(p => p.type === 'year')?.value);
  const month = Number(parts.find(p => p.type === 'month')?.value);
  const day = Number(parts.find(p => p.type === 'day')?.value);
  return new Date(Date.UTC(year, month - 1, day));
};

const getCurrentDate = (): Date => {
  // 1. Permite simular una fecha mediante un parámetro de consulta en la URL (ej. ?date=2026-08-05)
  // Esto facilita las pruebas de diferentes días del evento tanto localmente como en GitHub.
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date') || params.get('testDate');
    if (dateParam) {
      const [year, month, day] = dateParam.split('-').map(Number);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        // Usamos las 12:00:00 UTC para evitar que desfases de zona horaria cambien el día
        return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      }
    }
  }

  // 2. Si estamos en modo de desarrollo local (DEV) o si la fecha actual es anterior al lanzamiento oficial del evento (3 de Agosto de 2026 en Perú),
  // forzamos por defecto la fecha estable de pruebas (5 de Agosto de 2026).
  const eventStart = new Date(Date.UTC(2026, 7, 3, 0, 0, 0)); // 3 de Agosto de 2026
  const now = new Date();
  const nowInPeru = getPeruDateAsUTC(now);

  if (import.meta.env.DEV || nowInPeru.getTime() < eventStart.getTime()) {
    // Usamos las 12:00:00 UTC para evitar desajustes de huso horario al formatear/comparar
    return new Date(Date.UTC(2026, 7, 5, 12, 0, 0)); // 5 de Agosto de 2026 (AA MM DD)
  }

  return now;
};

export const getLevelStatus = (levelDate: string, referenceDate: Date = getCurrentDate()): LevelStatus => {
  const today = getPeruDateAsUTC(referenceDate);
  const levelDay = parseLevelDate(levelDate);

  if (levelDay.getTime() < today.getTime()) {
    return 'completed';
  }

  if (levelDay.getTime() === today.getTime()) {
    return 'available';
  }

  return 'locked';
};

export const formatLevelDate = (levelDate: string) => {
  return parseLevelDate(levelDate).toLocaleDateString('es-PE', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

export const formatLevelDateLong = (levelDate: string) => {
  return parseLevelDate(levelDate).toLocaleDateString('es-PE', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};