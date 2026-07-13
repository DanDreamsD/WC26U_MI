export interface LevelDefinition {
  level: number;
  xpRequired: number;
  title: string;
}

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  { level: 1,  xpRequired: 0,    title: 'Novato' },
  { level: 2,  xpRequired: 100,  title: 'Explorador' },
  { level: 3,  xpRequired: 250,  title: 'Aprendiz' },
  { level: 4,  xpRequired: 500,  title: 'Profesional' },
  { level: 5,  xpRequired: 800,  title: 'Especialista' },
  { level: 6,  xpRequired: 1100, title: 'Experto' },
  { level: 7,  xpRequired: 1500, title: 'Maestro' },
  { level: 8,  xpRequired: 1800, title: 'Leyenda' },
  { level: 9,  xpRequired: 2100, title: 'Visionario' },
  { level: 10, xpRequired: 2500, title: 'Embajador CEIISE' },
];

export const MAX_LEVEL = LEVEL_DEFINITIONS[LEVEL_DEFINITIONS.length - 1].level;

/**
 * Given an XP amount, returns the current level definition.
 */
export const getLevelForXp = (xp: number): LevelDefinition => {
  let result = LEVEL_DEFINITIONS[0];
  for (const def of LEVEL_DEFINITIONS) {
    if (xp >= def.xpRequired) {
      result = def;
    } else {
      break;
    }
  }
  return result;
};

/**
 * Returns the next level definition, or null if already at max.
 */
export const getNextLevel = (currentLevel: number): LevelDefinition | null => {
  const idx = LEVEL_DEFINITIONS.findIndex((d) => d.level === currentLevel);
  if (idx < 0 || idx >= LEVEL_DEFINITIONS.length - 1) return null;
  return LEVEL_DEFINITIONS[idx + 1];
};

/**
 * Returns XP progress as a percentage towards the next level (0-100).
 */
export const getXpProgress = (xp: number): number => {
  const current = getLevelForXp(xp);
  const next = getNextLevel(current.level);
  if (!next) return 100;

  const xpInLevel = xp - current.xpRequired;
  const xpNeeded = next.xpRequired - current.xpRequired;
  return Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
};
