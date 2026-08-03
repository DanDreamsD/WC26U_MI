import type { UserProgress } from '../utils/gamificationStore';

export interface SkillUnlockRule {
  nodeId: string;
  /** Human-readable description of how to unlock this skill. */
  hint: string;
  /** Returns true when the skill should be unlocked. */
  condition: (progress: UserProgress) => boolean;
}

/**
 * Maps each knowledge-tree node to its unlock conditions.
 * 
 * Branches:
 * - Liderazgo: n1 (Comunicación), n2 (Trabajo en Equipo), n3 (Negociación)
 * - Innovación: n4 (Industria 4.0), n5 (IA Aplicada), n6 (Transformación Digital)
 * - Logística Inteligente: n7 (Lean Manufacturing), n8 (Supply Chain), n9 (Automatización)
 * 
 * Los nodos se distribuyen a lo largo de los 5 días del congreso para que
 * ninguna habilidad pueda desbloquearse antes del Día 5.
 */
export const SKILL_UNLOCK_RULES: SkillUnlockRule[] = [
  // ── Liderazgo ───────────────────────────────────────────────────
  {
    nodeId: 'n1',
    hint: 'Asiste al Día 1 y aprueba el quiz (≥ 5/10)',
    condition: (p) =>
      p.attendanceDays.includes(1) &&
      (p.quizScores[1] ?? 0) >= 5,
  },
  {
    nodeId: 'n2',
    hint: 'Asiste al Día 1 y explora al menos 3 actividades del Día 1',
    condition: (p) =>
      p.attendanceDays.includes(1) &&
      p.exploredActivities.filter((a) => a.startsWith('1-')).length >= 3,
  },
  {
    nodeId: 'n3',
    hint: 'Asiste al Día 2 (Talk Experience de liderazgo) y aprueba el quiz (≥ 5/10)',
    condition: (p) =>
      p.attendanceDays.includes(2) &&
      (p.quizScores[2] ?? 0) >= 5,
  },

  // ── Innovación ──────────────────────────────────────────────────
  {
    nodeId: 'n4',
    hint: 'Asiste al Día 3 (Hub de Innovación Aplicada) y aprueba el quiz (≥ 5/10)',
    condition: (p) =>
      p.attendanceDays.includes(3) &&
      (p.quizScores[3] ?? 0) >= 5,
  },
  {
    nodeId: 'n5',
    hint: 'Asiste al Día 4 (ponencias virtuales de innovación) y aprueba el quiz (≥ 5/10)',
    condition: (p) =>
      p.attendanceDays.includes(4) &&
      (p.quizScores[4] ?? 0) >= 5,
  },
  {
    nodeId: 'n6',
    hint: 'Desbloquea Industria 4.0 e IA Aplicada, y aprueba el quiz del Día 5 (≥ 5/10)',
    condition: (p) =>
      p.unlockedNodes.includes('n4') &&
      p.unlockedNodes.includes('n5') &&
      (p.quizScores[5] ?? 0) >= 5,
  },

  // ── Logística Inteligente ───────────────────────────────────────
  {
    nodeId: 'n7',
    hint: 'Asiste al Día 3 y explora al menos 3 actividades del Día 3',
    condition: (p) =>
      p.attendanceDays.includes(3) &&
      p.exploredActivities.filter((a) => a.startsWith('3-')).length >= 3,
  },
  {
    nodeId: 'n8',
    hint: 'Asiste al Día 4 y explora la ponencia virtual SUPPLY CHAIN',
    condition: (p) =>
      p.attendanceDays.includes(4) &&
      p.exploredActivities.includes('4-SUPPLY CHAIN'),
  },
  {
    nodeId: 'n9',
    hint: 'Desbloquea Lean Manufacturing y Supply Chain, y asiste al Día 5',
    condition: (p) =>
      p.unlockedNodes.includes('n7') &&
      p.unlockedNodes.includes('n8') &&
      p.attendanceDays.includes(5),
  },
];

/**
 * Returns the unlock rule for a given node, or undefined if no rule exists.
 */
export const getUnlockRule = (nodeId: string): SkillUnlockRule | undefined =>
  SKILL_UNLOCK_RULES.find((r) => r.nodeId === nodeId);
