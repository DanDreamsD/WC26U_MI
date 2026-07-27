import type { UserProgress } from '../utils/gamificationStore';

export type BadgeRarity = 'Común' | 'Poco común' | 'Rara' | 'Épica' | 'Legendaria';

export interface BadgeDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: BadgeRarity;
  xpBonus: number;
  category: 'asistencia' | 'conocimiento' | 'exploración' | 'habilidades' | 'xp' | 'nivel' | 'temática';
  /** Returns true when the badge condition is met. */
  condition: (progress: UserProgress) => boolean;
}

const TOTAL_ACTIVITIES = 35; // Sum of all activities across 5 days

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // ── Insignias asignadas a IDs b1, b2, b3 ────────────────────────
  {
    id: 'b1',
    name: 'Primera conferencia',
    icon: '🌅',
    description: 'Asististe a tu primera ponencia en CEIISE.',
    rarity: 'Común',
    xpBonus: 10,
    category: 'asistencia',
    condition: (p) => p.attendanceDays.includes(1),
  },
  {
    id: 'b2',
    name: 'Innovador',
    icon: '🚀',
    description: 'Completaste 3 actividades de la rama de Innovación.',
    rarity: 'Rara',
    xpBonus: 20,
    category: 'temática',
    condition: (p) => p.attendanceDays.includes(2) && p.quizzesCompleted.includes(2),
  },
  {
    id: 'b3',
    name: 'Networking',
    icon: '🤝',
    description: 'Hiciste conexión con 5 participantes diferentes.',
    rarity: 'Épica',
    xpBonus: 30,
    category: 'exploración',
    condition: (p) => p.exploredActivities.length >= 5,
  },
  {
    id: 'b-attendance-3',
    name: 'Constante',
    icon: '📅',
    description: 'Asististe 3 días del congreso.',
    rarity: 'Poco común',
    xpBonus: 20,
    category: 'asistencia',
    condition: (p) => p.attendanceDays.length >= 3,
  },
  {
    id: 'b-attendance-5',
    name: 'Asistencia Perfecta',
    icon: '🏅',
    description: 'Asististe a los 5 días del congreso.',
    rarity: 'Épica',
    xpBonus: 50,
    category: 'asistencia',
    condition: (p) => p.attendanceDays.length >= 5,
  },

  // ── Conocimiento ────────────────────────────────────────────────
  {
    id: 'b-quiz-first',
    name: 'Primer Reto',
    icon: '📝',
    description: 'Completaste tu primer cuestionario.',
    rarity: 'Común',
    xpBonus: 10,
    category: 'conocimiento',
    condition: (p) => p.quizzesCompleted.length >= 1,
  },
  {
    id: 'b-quiz-3',
    name: 'Estudioso',
    icon: '📚',
    description: 'Completaste 3 cuestionarios.',
    rarity: 'Poco común',
    xpBonus: 20,
    category: 'conocimiento',
    condition: (p) => p.quizzesCompleted.length >= 3,
  },
  {
    id: 'b-quiz-all',
    name: 'Erudito',
    icon: '🎓',
    description: 'Completaste los 5 cuestionarios.',
    rarity: 'Rara',
    xpBonus: 30,
    category: 'conocimiento',
    condition: (p) => p.quizzesCompleted.length >= 5,
  },
  {
    id: 'b-quiz-perfect',
    name: 'Perfeccionista',
    icon: '💎',
    description: 'Obtuviste 10/10 en un cuestionario.',
    rarity: 'Rara',
    xpBonus: 30,
    category: 'conocimiento',
    condition: (p) => Object.values(p.quizScores).some((s) => s === 10),
  },
  {
    id: 'b-quiz-all-perfect',
    name: 'Genio CEIISE',
    icon: '🧠',
    description: 'Obtuviste 10/10 en todos los cuestionarios.',
    rarity: 'Legendaria',
    xpBonus: 100,
    category: 'conocimiento',
    condition: (p) =>
      p.quizzesCompleted.length >= 5 &&
      Object.values(p.quizScores).every((s) => s === 10),
  },

  // ── Exploración ─────────────────────────────────────────────────
  {
    id: 'b-explore-5',
    name: 'Curioso',
    icon: '🔍',
    description: 'Exploraste 5 actividades del programa.',
    rarity: 'Común',
    xpBonus: 10,
    category: 'exploración',
    condition: (p) => p.exploredActivities.length >= 5,
  },
  {
    id: 'b-explore-15',
    name: 'Investigador',
    icon: '🗺️',
    description: 'Exploraste 15 actividades del programa.',
    rarity: 'Poco común',
    xpBonus: 20,
    category: 'exploración',
    condition: (p) => p.exploredActivities.length >= 15,
  },
  {
    id: 'b-explore-all',
    name: 'Cartógrafo',
    icon: '🧭',
    description: 'Exploraste todas las actividades.',
    rarity: 'Rara',
    xpBonus: 30,
    category: 'exploración',
    condition: (p) => p.exploredActivities.length >= TOTAL_ACTIVITIES,
  },

  // ── Habilidades ─────────────────────────────────────────────────
  {
    id: 'b-skill-first',
    name: 'Nueva Competencia',
    icon: '💡',
    description: 'Desbloqueaste tu primera habilidad.',
    rarity: 'Común',
    xpBonus: 10,
    category: 'habilidades',
    condition: (p) => p.unlockedNodes.length >= 1,
  },
  {
    id: 'b-skill-branch',
    name: 'Rama Completa',
    icon: '🌿',
    description: 'Completaste una rama del árbol de habilidades.',
    rarity: 'Rara',
    xpBonus: 30,
    category: 'habilidades',
    condition: (p) => {
      const branches = [
        ['n1', 'n2', 'n3'], // Liderazgo
        ['n4', 'n5', 'n6'], // Innovación
        ['n7', 'n8', 'n9'], // Logística Inteligente
      ];
      return branches.some((branch) => branch.every((n) => p.unlockedNodes.includes(n)));
    },
  },
  {
    id: 'b-skill-all',
    name: 'Dominio Total',
    icon: '🌳',
    description: 'Desbloqueaste todas las habilidades.',
    rarity: 'Legendaria',
    xpBonus: 100,
    category: 'habilidades',
    condition: (p) => p.unlockedNodes.length >= 9,
  },

  // ── XP milestones ──────────────────────────────────────────────
  {
    id: 'b-xp-100',
    name: 'Primeros Pasos',
    icon: '⭐',
    description: 'Alcanzaste 100 XP.',
    rarity: 'Común',
    xpBonus: 0,
    category: 'xp',
    condition: (p) => p.xp >= 100,
  },
  {
    id: 'b-xp-500',
    name: 'En Ascenso',
    icon: '🌟',
    description: 'Alcanzaste 500 XP.',
    rarity: 'Poco común',
    xpBonus: 0,
    category: 'xp',
    condition: (p) => p.xp >= 500,
  },
  {
    id: 'b-xp-1000',
    name: 'Imparable',
    icon: '✨',
    description: 'Alcanzaste 1000 XP.',
    rarity: 'Rara',
    xpBonus: 0,
    category: 'xp',
    condition: (p) => p.xp >= 1000,
  },
  {
    id: 'b-xp-2000',
    name: 'Élite CEIISE',
    icon: '🔥',
    description: 'Alcanzaste 2000 XP.',
    rarity: 'Épica',
    xpBonus: 0,
    category: 'xp',
    condition: (p) => p.xp >= 2000,
  },

  // ── Nivel milestones ───────────────────────────────────────────
  {
    id: 'b-level-5',
    name: 'Medio Camino',
    icon: '🎯',
    description: 'Alcanzaste nivel 5.',
    rarity: 'Poco común',
    xpBonus: 0,
    category: 'nivel',
    condition: (p) => p.level >= 5,
  },
  {
    id: 'b-level-10',
    name: 'Embajador',
    icon: '👑',
    description: 'Alcanzaste nivel 10.',
    rarity: 'Legendaria',
    xpBonus: 0,
    category: 'nivel',
    condition: (p) => p.level >= 10,
  },

  // ── Temáticas ──────────────────────────────────────────────────
  {
    id: 'b-day-logistica',
    name: 'Logístico',
    icon: '⚙️',
    description: 'Asististe y completaste el quiz del día de Logística.',
    rarity: 'Rara',
    xpBonus: 20,
    category: 'temática',
    condition: (p) => p.attendanceDays.includes(3) && p.quizzesCompleted.includes(3),
  },
  {
    id: 'b-pionero',
    name: 'Pionero CEIISE',
    icon: '🏅',
    description: 'Insignia exclusiva por participar en el CEIISE 2026.',
    rarity: 'Legendaria',
    xpBonus: 0,
    category: 'temática',
    condition: () => false, // Reclamado manualmente desde la sección de premios
  },
];

export const getBadgeById = (id: string): BadgeDefinition | undefined =>
  BADGE_DEFINITIONS.find((b) => b.id === id);

export const RARITY_COLORS: Record<BadgeRarity, string> = {
  'Común': 'bg-gray-100 text-gray-600 border-gray-200',
  'Poco común': 'bg-green-50 text-green-600 border-green-200',
  'Rara': 'bg-blue-50 text-blue-600 border-blue-200',
  'Épica': 'bg-purple-50 text-purple-600 border-purple-200',
  'Legendaria': 'bg-amber-50 text-amber-600 border-amber-200',
};
