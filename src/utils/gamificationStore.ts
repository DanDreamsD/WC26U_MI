import { getLevelForXp } from '../data/levelDefinitions';
import { BADGE_DEFINITIONS } from '../data/badgeDefinitions';
import { SKILL_UNLOCK_RULES } from '../data/skillUnlockRules';
import { getSupabase } from './supabaseClient';

// ── Types ─────────────────────────────────────────────────────────

export interface UserProgress {
  documentId: string;
  xp: number;
  level: number;
  attendanceDays: number[];
  quizScores: Record<number, number>;
  quizzesCompleted: number[];
  exploredActivities: string[];
  unlockedNodes: string[];
  earnedBadges: string[];
  lastUpdated: string;
}

export interface GamificationEvent {
  type: 'xp' | 'badge' | 'skill' | 'level-up';
  label: string;
  value?: number;
  icon?: string;
}

// ── State Initialization ──────────────────────────────────────────

const PROGRESO_TABLE = 'PROGRESO';
const REVIEWER_DOCUMENT_ID = '99999999';

export const createEmptyProgress = (documentId: string): UserProgress => ({
  documentId,
  xp: 0,
  level: 1,
  attendanceDays: [],
  quizScores: {},
  quizzesCompleted: [],
  exploredActivities: [],
  unlockedNodes: [],
  earnedBadges: [],
  lastUpdated: new Date().toISOString(),
});

const progressToRow = (progress: UserProgress) => ({
  dni: progress.documentId,
  xp: progress.xp,
  nivel: progress.level,
  asistencias: progress.attendanceDays,
  quiz_scores: progress.quizScores as Record<string, number>,
  quizzes: progress.quizzesCompleted,
  explorados: progress.exploredActivities,
  nodos: progress.unlockedNodes,
  insignias: progress.earnedBadges,
  actualizado: progress.lastUpdated,
});

const rowToProgress = (row: any): UserProgress => ({
  documentId: row.dni,
  xp: Number(row.xp ?? 0),
  level: Number(row.nivel ?? 1) || 1,
  attendanceDays: Array.isArray(row.asistencias) ? row.asistencias.map(Number) : [],
  quizScores: row.quiz_scores && typeof row.quiz_scores === 'object' ? (row.quiz_scores as Record<number, number>) : {},
  quizzesCompleted: Array.isArray(row.quizzes) ? row.quizzes.map(Number) : [],
  exploredActivities: Array.isArray(row.explorados) ? row.explorados : [],
  unlockedNodes: Array.isArray(row.nodos) ? row.nodos : [],
  earnedBadges: Array.isArray(row.insignias) ? row.insignias : [],
  lastUpdated: row.actualizado || new Date().toISOString(),
});

export const loadProgress = async (documentId: string): Promise<UserProgress> => {
  if (documentId === REVIEWER_DOCUMENT_ID) {
    return createEmptyProgress(documentId);
  }

  try {
    const client = getSupabase();
    const { data, error } = await (client as any)
      .from(PROGRESO_TABLE)
      .select('*')
      .eq('dni', documentId)
      .maybeSingle();

    if (error) {
      throw error;
    }
    if (data) {
      return rowToProgress(data);
    }
  } catch (error) {
    console.error('Error al cargar el progreso desde Supabase:', error);
  }

  return createEmptyProgress(documentId);
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
  if (progress.documentId === REVIEWER_DOCUMENT_ID) {
    return;
  }

  progress.lastUpdated = new Date().toISOString();

  try {
    const client = getSupabase();
    const { error } = await (client as any)
      .from(PROGRESO_TABLE)
      .upsert(progressToRow(progress), { onConflict: 'dni' });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error al guardar el progreso en Supabase:', error);
  }
};

// ── XP & Level Engine ─────────────────────────────────────────────

/**
 * Adds XP to progress and recalculates the level.
 * Returns events generated (xp gain + level up if applicable).
 */
export const addXp = (
  progress: UserProgress,
  amount: number,
  reason: string
): GamificationEvent[] => {
  if (amount <= 0) return [];

  const events: GamificationEvent[] = [];
  const prevLevel = progress.level;

  progress.xp += amount;
  events.push({ type: 'xp', label: reason, value: amount });

  const newLevelDef = getLevelForXp(progress.xp);
  progress.level = newLevelDef.level;

  if (newLevelDef.level > prevLevel) {
    events.push({
      type: 'level-up',
      label: `¡Nivel ${newLevelDef.level}: ${newLevelDef.title}!`,
      value: newLevelDef.level,
      icon: '🎉',
    });
  }

  return events;
};

// ── Attendance ────────────────────────────────────────────────────

/**
 * Records attendance for a day. Returns events generated.
 */
export const recordAttendance = (
  progress: UserProgress,
  day: number
): GamificationEvent[] => {
  if (progress.attendanceDays.includes(day)) return [];

  progress.attendanceDays.push(day);
  const events = addXp(progress, 50, `Asistencia Día ${day}`);

  // Full attendance bonus
  if (progress.attendanceDays.length === 5) {
    events.push(...addXp(progress, 200, '¡Asistencia completa (5/5)!'));
  }

  return events;
};

// ── Quiz ──────────────────────────────────────────────────────────

/**
 * Records a quiz score for a day. Returns events generated.
 */
export const recordQuizScore = (
  progress: UserProgress,
  day: number,
  score: number
): GamificationEvent[] => {
  const isFirstQuizEver = progress.quizzesCompleted.length === 0;
  const alreadyCompleted = progress.quizzesCompleted.includes(day);

  // Always update the best score
  const previousBest = progress.quizScores[day] ?? 0;
  if (score > previousBest) {
    progress.quizScores[day] = score;
  }

  // Only award XP for the first completion of this day's quiz
  if (alreadyCompleted) return [];

  progress.quizzesCompleted.push(day);

  const events: GamificationEvent[] = [];

  // Base XP: 10 per correct answer
  const baseXp = score * 10;
  events.push(...addXp(progress, baseXp, `Quiz Día ${day}: ${score}/10`));

  // Perfect score bonus
  if (score === 10) {
    events.push(...addXp(progress, 50, `¡Quiz perfecto Día ${day}!`));
  }

  // First quiz ever bonus
  if (isFirstQuizEver) {
    events.push(...addXp(progress, 30, '¡Primer cuestionario completado!'));
  }

  return events;
};

// ── Activity Exploration ──────────────────────────────────────────

/**
 * Creates a unique key for an activity (dayId-title).
 */
export const makeActivityKey = (dayId: number, title: string): string =>
  `${dayId}-${title}`;

/**
 * Records an activity exploration. Returns events generated.
 */
export const recordExploredActivity = (
  progress: UserProgress,
  dayId: number,
  title: string
): GamificationEvent[] => {
  const key = makeActivityKey(dayId, title);
  if (progress.exploredActivities.includes(key)) return [];

  progress.exploredActivities.push(key);
  return addXp(progress, 5, `Explorar: ${title}`);
};

// ── Skill Unlock Evaluation ───────────────────────────────────────

/**
 * Evaluates all skill unlock rules and unlocks any newly-qualified nodes.
 * Returns events for newly unlocked skills.
 */
export const evaluateSkillUnlocks = (
  progress: UserProgress
): GamificationEvent[] => {
  const events: GamificationEvent[] = [];

  // We may need multiple passes since some nodes depend on others
  let changed = true;
  while (changed) {
    changed = false;
    for (const rule of SKILL_UNLOCK_RULES) {
      if (progress.unlockedNodes.includes(rule.nodeId)) continue;
      if (rule.condition(progress)) {
        progress.unlockedNodes.push(rule.nodeId);
        events.push({
          type: 'skill',
          label: `Habilidad desbloqueada: ${rule.nodeId}`,
          icon: '🔓',
        });
        changed = true;
      }
    }
  }

  return events;
};

// ── Badge Evaluation ──────────────────────────────────────────────

/**
 * Evaluates all badge conditions and awards any newly-earned badges.
 * Some badges grant bonus XP, which may trigger more badges/level-ups.
 * Returns events for newly earned badges.
 */
export const evaluateBadges = (
  progress: UserProgress
): GamificationEvent[] => {
  const events: GamificationEvent[] = [];

  // Keep evaluating until no new badges are earned (because badge xp bonuses
  // can trigger XP milestones which are also badges)
  let changed = true;
  while (changed) {
    changed = false;
    for (const badge of BADGE_DEFINITIONS) {
      if (progress.earnedBadges.includes(badge.id)) continue;
      if (badge.condition(progress)) {
        progress.earnedBadges.push(badge.id);
        events.push({
          type: 'badge',
          label: badge.name,
          icon: badge.icon,
        });

        if (badge.xpBonus > 0) {
          events.push(...addXp(progress, badge.xpBonus, `Insignia: ${badge.name}`));
        }

        changed = true;
      }
    }
  }

  return events;
};

// ── Full Evaluation Pipeline ──────────────────────────────────────

/**
 * Runs the full evaluation pipeline: skills → badges → save.
 * Call this after any action that modifies progress.
 * Returns all events generated.
 */
export const evaluateAndSave = (
  progress: UserProgress
): GamificationEvent[] => {
  const events: GamificationEvent[] = [];

  events.push(...evaluateSkillUnlocks(progress));
  events.push(...evaluateBadges(progress));

  void saveProgress(progress);
  return events;
};

// ── Full Progress for Reviewer ────────────────────────────────────

export const createFullProgress = (documentId: string): UserProgress => ({
  documentId,
  xp: 2500,
  level: 10,
  attendanceDays: [1, 2, 3, 4, 5],
  quizScores: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 10 },
  quizzesCompleted: [1, 2, 3, 4, 5],
  exploredActivities: [],
  unlockedNodes: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9'],
  earnedBadges: BADGE_DEFINITIONS.map((b) => b.id),
  lastUpdated: new Date().toISOString(),
});
