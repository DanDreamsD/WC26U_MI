import type { UserProgress } from './gamificationStore';

const API_URL = import.meta.env.VITE_ATTENDANCE_API_URL || '';

/**
 * Sends the user's progress data to Google Sheets via the Web App API.
 */
export const syncProgressToSheets = async (progress: UserProgress): Promise<boolean> => {
  if (!API_URL) {
    return false;
  }

  // Do not sync the reviewer profile to keep Google Sheets clean
  if (progress.documentId === '99999999') {
    return true;
  }

  try {
    const payload = {
      action: 'saveProgress',
      documentId: progress.documentId,
      xp: progress.xp,
      level: progress.level,
      attendanceDays: progress.attendanceDays.join(','),
      quizScores: JSON.stringify(progress.quizScores),
      quizzesCompleted: progress.quizzesCompleted.join(','),
      exploredActivities: progress.exploredActivities.join(','),
      unlockedNodes: progress.unlockedNodes.join(','),
      earnedBadges: progress.earnedBadges.join(','),
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Error en respuesta de Google Sheets:', response.statusText);
      return false;
    }

    const data = await response.json();
    return Boolean(data.success);
  } catch (error) {
    console.error('Error al sincronizar progreso con Google Sheets:', error);
    return false;
  }
};

/**
 * Loads the user's progress data from Google Sheets via the Web App API.
 */
export const loadProgressFromSheets = async (documentId: string): Promise<UserProgress | null> => {
  if (!API_URL || documentId === '99999999') {
    return null;
  }

  try {
    const response = await fetch(
      `${API_URL}?action=getProgress&documentId=${encodeURIComponent(documentId)}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data && data.success && data.progress) {
      const p = data.progress;
      return {
        documentId,
        xp: Number(p.xp || 0),
        level: Number(p.level || 1),
        attendanceDays: p.attendanceDays ? p.attendanceDays.split(',').map(Number).filter((n: number) => !isNaN(n)) : [],
        quizScores: p.quizScores ? JSON.parse(p.quizScores) : {},
        quizzesCompleted: p.quizzesCompleted ? p.quizzesCompleted.split(',').map(Number).filter((n: number) => !isNaN(n)) : [],
        exploredActivities: p.exploredActivities ? p.exploredActivities.split(',').filter(Boolean) : [],
        unlockedNodes: p.unlockedNodes ? p.unlockedNodes.split(',').filter(Boolean) : [],
        earnedBadges: p.earnedBadges ? p.earnedBadges.split(',').filter(Boolean) : [],
        lastUpdated: p.lastUpdated || new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('Error al cargar progreso desde Google Sheets:', error);
  }
  return null;
};
