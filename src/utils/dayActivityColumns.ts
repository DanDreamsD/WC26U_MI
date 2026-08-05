export interface DayActivityColumn {
  column: string;
  title: string;
}

const activityKey = (dayId: number, title: string): string => `${dayId}-${title}`;

// Los nombres de columna de la BD son manuales (no derivados del título),
// por lo que se mapean explícitamente por día.
export const DAY_ACTIVITY_COLUMNS: Record<number, DayActivityColumn[]> = {
  1: [
    { column: 'act_d1_numero_musical', title: 'Número musical' },
    { column: 'act_d1_inauguracion', title: 'Inauguración' },
    { column: 'act_d1_empleabilidad', title: 'Empleabilidad y nuevas exigencias del mercado laboral' },
    { column: 'act_d1_liderazgo', title: 'Liderazgo práctico para jóvenes profesionales' },
    { column: 'act_d1_meet_greet', title: 'Meet & Greet' },
    { column: 'act_d1_almuerzo', title: 'Almuerzo libre' },
    { column: 'act_d1_marca_personal', title: 'Estrategias para generar oportunidades laborales a través de tu marca personal' },
    { column: 'act_d1_competencias', title: 'Competencias profesionales para destacar en la industria actual' },
    { column: 'act_d1_noche_cultural', title: 'Noche cultural' },
  ],
  2: [
    { column: 'act_d2_visitas_tecnicas', title: 'Espacio de visitas técnicas' },
    { column: 'act_d2_almuerzo', title: 'Almuerzo libre' },
    { column: 'act_d2_historias_liderazgo', title: 'Historias reales de crecimiento profesional y liderazgo' },
    { column: 'act_d2_ponencia', title: 'Ponencia' },
    { column: 'act_d2_feria_voluntariados', title: 'Feria de voluntariados' },
    { column: 'act_d2_meet_greet', title: 'Meet & Greet' },
  ],
  3: [
    { column: 'act_d3_visita_tecnica', title: 'Espacio de visita técnica' },
    { column: 'act_d3_almuerzo', title: 'Almuerzo libre' },
    { column: 'act_d3_feria_laboral', title: 'Feria laboral y Hub de innovación aplicada' },
    { column: 'act_d3_supply_chain_challenge', title: 'Supply Chain Challenge: optimización de una cadena de suministro' },
    { column: 'act_d3_coffee_break', title: 'Coffee Break' },
  ],
  4: [
    { column: 'act_d4_visita_tecnica', title: 'Espacio de visita técnica' },
    { column: 'act_d4_supply_chain', title: 'SUPPLY CHAIN' },
    { column: 'act_d4_design_thinking', title: 'Design Thinking aplicado a la solución de problemas' },
  ],
  5: [
    { column: 'act_d5_recepcion', title: 'Recepción' },
    { column: 'act_d5_innovar_tecnologia', title: 'Innovar con tecnología: el futuro de las ingenierías' },
    { column: 'act_d5_transformacion_digital', title: 'Retos reales de la transformación digital en empresas peruanas' },
    { column: 'act_d5_buffet_fotos', title: 'Buffet y Fotos' },
    { column: 'act_d5_design_thinking', title: 'Design Thinking aplicado a problemas reales' },
    { column: 'act_d5_cierre', title: 'Cierre' },
    { column: 'act_d5_concierto', title: 'Concierto' },
  ],
};

export const getDayActivityColumns = (dayId: number): DayActivityColumn[] =>
  DAY_ACTIVITY_COLUMNS[dayId] ?? [];

export const columnToActivityKey = (
  dayId: number,
  column: string
): string | null => {
  const match = getDayActivityColumns(dayId).find((c) => c.column === column);
  return match ? activityKey(dayId, match.title) : null;
};

export const activityKeyToColumn = (dayId: number, key: string): string | null => {
  const match = getDayActivityColumns(dayId).find(
    (c) => activityKey(dayId, c.title) === key
  );
  return match ? match.column : null;
};

export const rowToExploredKeys = (dayId: number, row: any): string[] => {
  const keys: string[] = [];
  getDayActivityColumns(dayId).forEach(({ column }) => {
    const value = row ? row[column] : undefined;
    if (value === true || value === 1 || value === '1') {
      const key = columnToActivityKey(dayId, column);
      if (key) keys.push(key);
    }
  });
  return keys;
};

export const exploredKeysToRow = (
  dayId: number,
  keys: string[]
): Record<string, number> => {
  const row: Record<string, number> = {};
  getDayActivityColumns(dayId).forEach(({ column, title }) => {
    row[column] = keys.includes(activityKey(dayId, title)) ? 1 : 0;
  });
  return row;
};
