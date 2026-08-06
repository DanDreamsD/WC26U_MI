import { getLevelForXp } from '../data/levelDefinitions';
import { BADGE_DEFINITIONS, getBadgeById } from '../data/badgeDefinitions';
import { SKILL_UNLOCK_RULES } from '../data/skillUnlockRules';
import { getSupabase } from './supabaseClient';
import {
  rowToExploredKeys,
  exploredKeysToRow,
} from './dayActivityColumns';

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

export const REVIEWER_DOCUMENT_ID = '99999999';
const ACTIVITY_DAYS = [1, 2, 3, 4, 5];

const activitiesTableForDay = (day: number): string => `DIA_${day}_ACTIVIDADES`;
const quizTableForDay = (day: number): string => `CUESTIONARIOS_${day}`;

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

export const loadProgress = async (documentId: string): Promise<UserProgress> => {
  if (documentId === REVIEWER_DOCUMENT_ID) {
    return createEmptyProgress(documentId);
  }

  const progress = createEmptyProgress(documentId);

  // La asistencia se lee de la tabla ASISTENCIA (una fila por usuario, DIA1..DIA5)
  try {
    const client = getSupabase();
    const { data: attendanceRow, error: attendanceError } = await (client as any)
      .from('ASISTENCIA')
      .select('DIA1, DIA2, DIA3, DIA4, DIA5')
      .eq('DNI', documentId)
      .limit(1)
      .maybeSingle();

    if (attendanceError) {
      throw attendanceError;
    }
    if (attendanceRow) {
      progress.attendanceDays = [1, 2, 3, 4, 5].filter(
        (day) => attendanceRow[`DIA${day}`]
      );
    }
  } catch (error) {
    console.error('Error al cargar la asistencia desde Supabase:', error);
  }

  // Actividades exploradas desde las matrices binarias (una columna por actividad)
  try {
    const client = getSupabase();
    const explored = new Set(progress.exploredActivities);

    for (const day of ACTIVITY_DAYS) {
      const { data: dayRow, error: dayError } = await (client as any)
        .from(activitiesTableForDay(day))
        .select('*')
        .eq('DNI', documentId)
        .maybeSingle();

      if (dayError) {
        throw dayError;
      }

      rowToExploredKeys(day, dayRow ?? {}).forEach((key) => explored.add(key));
    }

    progress.exploredActivities = Array.from(explored);
  } catch (error) {
    console.error('Error al cargar las actividades desde Supabase:', error);
  }

  // Resultados de cuestionarios desde CUESTIONARIOS_1..5 (TOTAL = mejor acierto del día)
  try {
    const client = getSupabase();
    for (const day of ACTIVITY_DAYS) {
      const { data: quizRow, error: quizError } = await (client as any)
        .from(quizTableForDay(day))
        .select('TOTAL')
        .eq('DNI', documentId)
        .maybeSingle();

      if (quizError) {
        throw quizError;
      }
      if (quizRow && quizRow.TOTAL != null) {
        progress.quizScores[day] = Number(quizRow.TOTAL);
        if (!progress.quizzesCompleted.includes(day)) {
          progress.quizzesCompleted.push(day);
        }
      }
    }
  } catch (error) {
    console.error('Error al cargar los cuestionarios desde Supabase:', error);
  }

  // 1) XP base solo de las interacciones (asistencia, quizzes, exploración),
  //    para que las insignias basadas en XP/nivel se evalúen correctamente.
  syncXpFromActivity(progress);

  // 2) Habilidades e insignias se re-evalúan desde la actividad registrada
  evaluateSkillUnlocks(progress);
  evaluateBadges(progress);

  // 3) XP definitivo = interacciones + bonos de insignias (sin eventos ni animaciones)
  syncXpFromActivity(progress);

  return progress;
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
  if (progress.documentId === REVIEWER_DOCUMENT_ID) {
    return;
  }

  progress.lastUpdated = new Date().toISOString();

  // Guardar matriz binaria de actividades (una columna por actividad, 1 = explorada)
  for (const day of ACTIVITY_DAYS) {
    try {
      const client = getSupabase();
      const dayRow = {
        DNI: progress.documentId,
        ...exploredKeysToRow(day, progress.exploredActivities),
      };
      const { error } = await (client as any)
        .from(activitiesTableForDay(day))
        .upsert(dayRow, { onConflict: 'DNI' });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(`Error al guardar las actividades del Día ${day} en Supabase:`, error);
    }
  }
};

// ── XP & Level Engine ─────────────────────────────────────────────

/**
 * Calcula el XP a partir de la actividad registrada del usuario:
 * asistencia, cuestionarios, actividades exploradas e insignias.
 * Es la fuente de verdad del puntaje (la tabla EXPERIENCIA ya no se usa).
 */
export const calculateXpFromActivity = (progress: UserProgress): number => {
  // Asistencia: 50 XP por día + 200 por asistencia completa (5/5)
  const attendanceXp =
    progress.attendanceDays.length * 50 +
    (progress.attendanceDays.length === 5 ? 200 : 0);

  // Cuestionarios: 10 XP por acierto (mejor puntaje), +30 por el primer quiz
  // y +50 por cada 10/10 (bono de perfección)
  const quizXp =
    progress.quizzesCompleted.reduce(
      (sum, day) => sum + (progress.quizScores[day] ?? 0) * 10,
      0
    ) +
    (progress.quizzesCompleted.length > 0 ? 30 : 0) +
    progress.quizzesCompleted.reduce(
      (sum, day) => sum + ((progress.quizScores[day] ?? 0) === 10 ? 50 : 0),
      0
    );

  // Exploración: 5 XP por actividad explorada
  const explorationXp = progress.exploredActivities.length * 5;

  // Insignias: XP de bonificación de cada insignia desbloqueada
  const badgeXp = progress.earnedBadges.reduce((sum, id) => {
    const badge = getBadgeById(id);
    return sum + (badge?.xpBonus ?? 0);
  }, 0);

  return attendanceXp + quizXp + explorationXp + badgeXp;
};

/**
 * Recalcula xp y nivel a partir de la actividad registrada (sin animaciones).
 * Se invoca en la pantalla de carga, antes de que el usuario use la plataforma.
 */
export const syncXpFromActivity = (progress: UserProgress): void => {
  progress.xp = calculateXpFromActivity(progress);
  progress.level = getLevelForXp(progress.xp).level;
};

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
 * When `gamified` is false (e.g. Standard users) attendance is recorded
 * for informational purposes but no XP is awarded.
 */
export const recordAttendance = (
  progress: UserProgress,
  day: number,
  gamified = true
): GamificationEvent[] => {
  if (progress.attendanceDays.includes(day)) return [];

  progress.attendanceDays.push(day);
  if (!gamified) return [];

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
 * Base XP is only awarded on the first completion; the perfect bonus is
 * awarded whenever the best score first reaches 10/10 (first try or retake).
 * When `gamified` is false (e.g. Standard users) the completion is recorded
 * but no XP is awarded.
 */
export const recordQuizScore = (
  progress: UserProgress,
  day: number,
  score: number,
  gamified = true
): GamificationEvent[] => {
  const isFirstQuizEver = progress.quizzesCompleted.length === 0;
  const alreadyCompleted = progress.quizzesCompleted.includes(day);
  const previousBest = progress.quizScores[day] ?? 0;

  const events: GamificationEvent[] = [];

  // Always update the best score
  progress.quizScores[day] = Math.max(previousBest, score);

  if (!alreadyCompleted) {
    progress.quizzesCompleted.push(day);
  }

  if (!gamified) return events;

  // Base XP: 10 XP por acierto según el MEJOR puntaje del día (primera vez o mejora)
  if (!alreadyCompleted) {
    events.push(...addXp(progress, score * 10, `Quiz Día ${day}: ${score}/10`));

    if (isFirstQuizEver) {
      events.push(...addXp(progress, 30, '¡Primer cuestionario completado!'));
    }
  } else if (score > previousBest) {
    events.push(
      ...addXp(
        progress,
        (score - previousBest) * 10,
        `Quiz Día ${day}: mejor puntaje ${previousBest} → ${score}`
      )
    );
  }

  // Perfect score bonus: first time the best score reaches 10/10
  if (score === 10 && previousBest < 10) {
    events.push(...addXp(progress, 50, `¡Quiz perfecto Día ${day}!`));
  }

  return events;
};

/**
 * Guarda el resultado del cuestionario de un día en la tabla CUESTIONARIOS_<día>.
 * `perQuestionCorrect` es un arreglo de 0/1, uno por pregunta (Q1..Q10).
 * Conserva el MEJOR puntaje del participante (DNI) si ya existe.
 */
export const saveQuizResults = async (
  documentId: string,
  day: number,
  perQuestionCorrect: number[]
): Promise<void> => {
  if (!documentId || documentId === REVIEWER_DOCUMENT_ID) return;

  const total = perQuestionCorrect.reduce((sum, value) => sum + value, 0);
  const row: Record<string, unknown> = {
    DNI: documentId,
    TOTAL: total,
  };
  perQuestionCorrect.forEach((value, index) => {
    if (index < 10) row[`Q${index + 1}`] = value;
  });

  try {
    const client = getSupabase();
    const table = quizTableForDay(day);
    const { data: existing, error: readError } = await (client as any)
      .from(table)
      .select('id, TOTAL')
      .eq('DNI', documentId)
      .maybeSingle();

    if (readError) {
      throw readError;
    }

    if (existing?.id) {
      if (total > Number(existing.TOTAL ?? 0)) {
        const { error } = await (client as any).from(table).update(row).eq('id', existing.id);
        if (error) {
          throw error;
        }
      }
    } else {
      const { error } = await (client as any).from(table).insert(row);
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Error al guardar el cuestionario del Día ${day} en Supabase:`, error);
  }
};

// ── Activity Exploration ──────────────────────────────────────────

/**
 * Creates a unique key for an activity (dayId-title).
 */
export const makeActivityKey = (dayId: number, title: string): string =>
  `${dayId}-${title}`;

/**
 * Records an activity exploration. Returns events generated.
 * When `gamified` is false (e.g. Standard users) the exploration is recorded
 * but no XP is awarded.
 */
export const recordExploredActivity = (
  progress: UserProgress,
  dayId: number,
  title: string,
  gamified = true
): GamificationEvent[] => {
  const key = makeActivityKey(dayId, title);
  if (progress.exploredActivities.includes(key)) return [];

  progress.exploredActivities.push(key);
  if (!gamified) return [];
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

  // El XP final siempre se deriva de las interacciones + bonos de insignias
  syncXpFromActivity(progress);

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
