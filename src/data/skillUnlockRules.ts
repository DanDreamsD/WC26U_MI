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
    hint: 'Asiste al Día 1 y aprueba el quiz (≥ 5/10) — Taller de Liderazgo',
    condition: (p) =>
      p.attendanceDays.includes(1) &&
      (p.quizScores[1] ?? 0) >= 5,
  },

  // ── Innovación ──────────────────────────────────────────────────
  {
    nodeId: 'n4',
    hint: 'Asiste al Día 2 y aprueba el quiz (≥ 5/10)',
    condition: (p) =>
      p.attendanceDays.includes(2) &&
      (p.quizScores[2] ?? 0) >= 5,
  },
  {
    nodeId: 'n5',
    hint: 'Asiste al Día 3 y aprueba el quiz (≥ 5/10) — Hub de Innovación Aplicada',
    condition: (p) =>
      p.attendanceDays.includes(3) &&
      (p.quizScores[3] ?? 0) >= 5,
  },
  {
    nodeId: 'n6',
    hint: 'Desbloquea Industria 4.0 (n4) e IA Aplicada (n5)',
    condition: (p) =>
      p.unlockedNodes.includes('n4') &&
      p.unlockedNodes.includes('n5'),
  },

  // ── Logística Inteligente ───────────────────────────────────────
  {
    nodeId: 'n7',
    hint: 'Asiste al Día 3 y aprueba el quiz (≥ 5/10)',
    condition: (p) =>
      p.attendanceDays.includes(3) &&
      (p.quizScores[3] ?? 0) >= 5,
  },
  {
    nodeId: 'n8',
    hint: 'Asiste al Día 3 y explora al menos 3 actividades del Día 3',
    condition: (p) =>
      p.attendanceDays.includes(3) &&
      p.exploredActivities.filter((a) => a.startsWith('3-')).length >= 3,
  },
  {
    nodeId: 'n9',
    hint: 'Desbloquea Lean Manufacturing (n7) y Supply Chain (n8)',
    condition: (p) =>
      p.unlockedNodes.includes('n7') &&
      p.unlockedNodes.includes('n8'),
  },
];

/**
 * Returns the unlock rule for a given node, or undefined if no rule exists.
 */
export const getUnlockRule = (nodeId: string): SkillUnlockRule | undefined =>
  SKILL_UNLOCK_RULES.find((r) => r.nodeId === nodeId);
