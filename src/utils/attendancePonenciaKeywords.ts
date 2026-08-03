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
  { dayId: 2, title: 'Ponencia', keyword: 'PONCEIISE-04' },
  { dayId: 3, title: 'Logística sostenible y tecnologías aplicadas', keyword: 'PONCEIISE-05' },
  { dayId: 4, title: 'SUPPLY CHAIN', keyword: 'PONCEIISE-06' },
  { dayId: 4, title: 'Design Thinking aplicado a la solución de problemas', keyword: 'PONCEIISE-07' },
  { dayId: 5, title: 'Innovar con tecnología: el futuro de las ingenierías', keyword: 'PONCEIISE-08' },
];

export const getPonenciaKeyword = (dayId: number, title: string): string | null => {
  const found = attendanceKeywordsByPonencia.find(
    (p) => p.dayId === dayId && p.title === title
  );
  return found ? found.keyword : null;
};

export const isPonenciaType = (type: string): boolean => type.includes('PONENCIA');
