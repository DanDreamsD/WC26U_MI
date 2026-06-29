
export type LevelStatus = 'completed' | 'available' | 'locked';

const parseLevelDate = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const getLevelStatus = (levelDate: string, referenceDate: Date = getCurrentDate()): LevelStatus => {
  const today = new Date(referenceDate);
  today.setUTCHours(0, 0, 0, 0);

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

const getCurrentDate = (): Date => {
  if (import.meta.env.DEV) {
    // Cambia esta fecha cuando quieras hacer pruebas
    return new Date(Date.UTC(2026, 7, 5)); // AA MM DD
  }

  return new Date();
};