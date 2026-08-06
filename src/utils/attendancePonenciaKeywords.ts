export interface PonenciaKeyword {
  dayId: number;
  title: string;
  keyword: string;
}

// Palabra clave única por ponencia (tipo PONENCIA / PONENCIA VIRTUAL).
// El título debe coincidir exactamente con dayActivityLibrary.
export const attendanceKeywordsByPonencia: PonenciaKeyword[] = [
  { dayId: 1, title: 'Empleabilidad y nuevas exigencias del mercado laboral', keyword: 'INDUSTRIA' },
  { dayId: 1, title: 'Estrategias para generar oportunidades laborales a través de tu marca personal', keyword: 'IMPACTO' },
  { dayId: 1, title: 'Competencias profesionales para destacar en la industria actual', keyword: 'ACCION' },
  { dayId: 2, title: 'Cultura organizacional y liderazgo humano', keyword: 'PONCEIISE-04' },
  { dayId: 5, title: 'Innovar con tecnología: el futuro de las ingenierías', keyword: 'PONCEIISE-08' },
  { dayId: 5, title: 'Design Thinking aplicado a problemas reales', keyword: 'PONCEIISE-09' },
];

export const getPonenciaColumn = (dayId: number, title: string): string | null => {
  if (dayId === 5 && title === 'Design Thinking aplicado a problemas reales') {
    return 'DIA5_T1';
  }
  const dayKeywords = attendanceKeywordsByPonencia.filter((p) => p.dayId === dayId);
  const index = dayKeywords.findIndex((p) => p.title === title);
  if (index === -1) return null;
  return `DIA${dayId}_P${index + 1}`;
};

export const isPonenciaType = (type: string): boolean => type.includes('PONENCIA');
