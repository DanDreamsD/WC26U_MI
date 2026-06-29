export type LevelStatus = 'completed' | 'available' | 'locked';

const parseLevelDate = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day); // Hora local 00:00:00 del dispositivo
};

const getCurrentDate = (): Date => {
  if (import.meta.env.DEV) {
    // Cambia esta fecha cuando quieras hacer pruebas localmente
    return new Date(2026, 7, 7); // 7 de Agosto de 2026 (Mes 7 es Agosto en JS)
  }

  return new Date(); // Fecha y hora del dispositivo del usuario
};

export const getLevelStatus = (levelDate: string, referenceDate: Date = getCurrentDate()): LevelStatus => {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0); // Limpia las horas en el tiempo local del dispositivo

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
    day: 'numeric'
  });
};

export const formatLevelDateLong = (levelDate: string) => {
  return parseLevelDate(levelDate).toLocaleDateString('es-PE', {
    month: 'long',
    day: 'numeric'
  });
};