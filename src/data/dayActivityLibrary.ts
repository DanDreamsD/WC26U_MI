export interface DayActivityDetail {
  dayId: number;
  time: string;
  title: string;
  type: string;
  speaker: string;
  description: string;
  location: string;
  requiresTicket?: string;
}

export const dayActivityLibrary: Record<number, DayActivityDetail[]> = {
  1: [
    {
      dayId: 1,
      time: '09:15 - 09:45',
      title: 'Número musical',
      type: 'ACTIVIDAD',
      speaker: 'Grupo artístico próximo a revelarse',
      description: 'Presentación musical para dar inicio al congreso con energía y espíritu de comunidad.',
      location: 'Auditorio de Administración'
    },
    {
      dayId: 1,
      time: '09:45 - 10:00',
      title: 'Inauguración',
      type: 'CEREMONIA',
      speaker: 'Directiva CEIISE',
      description: 'Ceremonia de apertura con palabras de bienvenida y presentación del programa.',
      location: 'Auditorio principal'
    },
    {
      dayId: 1,
      time: '10:00 - 10:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia inicial del día orientada a la empleabilidad y el futuro profesional.',
      location: 'Sala de conferencias'
    },
    {
      dayId: 1,
      time: '10:45 - 11:00',
      title: 'Taller Liderazgo',
      type: 'TALLER',
      speaker: 'Próximamente',
      description: 'Taller práctico para explorar habilidades de liderazgo aplicadas al entorno profesional.',
      location: 'Sala de talleres'
    },
    {
      dayId: 1,
      time: '11:00 - 11:45',
      title: 'Meet & Greet',
      type: 'NETWORKING',
      speaker: 'Ponentes y participantes',
      description: 'Espacio informal para conversar con especialistas, organizadores y otros asistentes.',
      location: 'Área de networking'
    },
    {
      dayId: 1,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar antes de las sesiones de la tarde.',
      location: 'Área de comidas'
    },
    {
      dayId: 1,
      time: '14:00 - 14:30',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Segunda ponencia del día para ampliar el análisis y cerrar conceptos clave.',
      location: 'Sala de conferencias'
    },
    {
      dayId: 1,
      time: '15:30 - 15:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Sesión complementaria para conectar la teoría con experiencias del sector.',
      location: 'Sala de conferencias'
    },
    {
      dayId: 1,
      time: '16:15 - 18:00',
      title: 'Noche cultural',
      type: 'ACTIVIDAD',
      speaker: 'Equipo cultural',
      description: 'Actividades culturales y de integración para cerrar el día con una experiencia memorable.',
      location: 'Espacio cultural'
    }
  ],
  2: [
    {
      dayId: 2,
      time: '09:45 - 12:30',
      title: 'Visita Técnica',
      type: 'VISITAS TÉCNICAS',
      speaker: 'Empresas invitadas',
      description: 'Recorrido técnico para observar operaciones, procesos y soluciones aplicadas en contexto real.',
      location: 'Instalaciones del evento'
    },
    {
      dayId: 2,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar.',
      location: 'Área de comidas'
    },
    {
      dayId: 2,
      time: '14:30 - 15:15',
      title: 'Talk Experience',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Sesión enfocada en compartir experiencias profesionales y lecciones de liderazgo estratégico.',
      location: 'Sala de conferencias'
    },
    {
      dayId: 2,
      time: '15:30 - 16:15',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Charla para reforzar herramientas y estrategias de desarrollo profesional.',
      location: 'Sala de conferencias'
    },
    {
      dayId: 2,
      time: '16:15 - 17:45',
      title: 'Feria de voluntariados',
      type: 'NETWORKING',
      speaker: 'Diversos voluntariados',
      description: 'Espacio de encuentro para aprender sobre iniciativas de apoyo, voluntariado y participación.',
      location: 'Área de participación'
    },
    {
      dayId: 2,
      time: '18:00 - 18:30',
      title: 'Meet & Greet',
      type: 'NETWORKING',
      speaker: 'Ponentes y participantes',
      description: 'Cierre del día con un espacio de interacción informal entre ponentes y asistentes.',
      location: 'Área de networking'
    }
  ],
  3: [
    {
      dayId: 3,
      time: '09:45 - 12:30',
      title: 'Visita Técnica',
      type: 'VISITAS TÉCNICAS',
      speaker: 'Empresas invitadas',
      description: 'Segmento técnico centrado en procesos productivos y soluciones innovadoras.',
      location: 'Instalaciones del evento'
    },
    {
      dayId: 3,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar.',
      location: 'Área de comidas'
    },
    {
      dayId: 3,
      time: '14:00 - 16:15',
      title: 'Feria laboral y Hub de innovación',
      type: 'FERIA',
      speaker: 'Empresas y organizaciones',
      description: 'Espacio para explorar oportunidades laborales y proyectos de innovación aplicada.',
      location: 'Pabellón de ferias'
    },
    {
      dayId: 3,
      time: '16:15 - 17:00',
      title: 'Taller Logística Inteligente',
      type: 'TALLER',
      speaker: 'Próximamente',
      description: 'Taller práctico sobre operaciones logísticas inteligentes y su impacto en la cadena de valor.',
      location: 'Sala de talleres'
    },
    {
      dayId: 3,
      time: '17:00 - 17:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia enfocada en buenas prácticas y tendencias de mejora en operaciones logísticas.',
      location: 'Sala de conferencias'
    },
    {
      dayId: 3,
      time: '17:45 - 18:00',
      title: 'Coffee Break',
      type: 'BREAK',
      speaker: 'Equipo de logística',
      description: 'Rango de descanso para reactivar y conversar entre sesiones.',
      location: 'Área de descanso'
    }
  ],
  4: [
    {
      dayId: 4,
      time: '09:45 - 12:30',
      title: 'Visita Técnica',
      type: 'VISITAS TÉCNICAS',
      speaker: 'Empresas invitadas',
      description: 'Visita técnica orientada a observar procesos y soluciones aplicadas en la industria.',
      location: 'Instalaciones del evento'
    },
    {
      dayId: 4,
      time: '14:30 - 16:15',
      title: 'Ponencia Virtual',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia virtual enfocada en innovación empresarial y metodologías ágiles.',
      location: 'Plataforma virtual'
    },
    {
      dayId: 4,
      time: '16:15 - 17:45',
      title: 'Ponencia Virtual',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Segunda ponencia virtual del día para profundizar en estrategias de innovación.',
      location: 'Plataforma virtual'
    }
  ],
  5: [
    {
      dayId: 5,
      time: '09:45 - 10:00',
      title: 'Recepción',
      type: 'REGISTRO',
      speaker: 'Staff CEIISE',
      description: 'Recepción del último día del congreso para dar la bienvenida a las sesiones de cierre.',
      location: 'Entrada principal'
    },
    {
      dayId: 5,
      time: '10:00 - 10:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia de cierre orientada a integrar aprendizajes de todo el congreso.',
      location: 'Sala de conferencias'
    },
    {
      dayId: 5,
      time: '11:00 - 12:30',
      title: 'Conversatorio',
      type: 'CONVERSATORIO',
      speaker: 'Próximamente',
      description: 'Conversatorio abierto donde se intercambian visiones y experiencias entre expertos y participantes.',
      location: 'Sala principal'
    },
    {
      dayId: 5,
      time: '12:30 - 14:00',
      title: 'Buffet y Fotos',
      type: 'BREAK',
      speaker: '',
      description: 'Buffet de cierre y sesión de fotos para conmemorar la participación en el congreso.',
      location: 'Área de comidas'
    },
    {
      dayId: 5,
      time: '14:30 - 15:30',
      title: 'Taller Innovación',
      type: 'TALLER',
      speaker: 'Próximamente',
      description: 'Taller para explorar enfoques creativos e innovación aplicada a retos reales.',
      location: 'Sala de talleres'
    },
    {
      dayId: 5,
      time: '15:30 - 15:45',
      title: 'Cierre',
      type: 'CEREMONIA',
      speaker: 'Directiva CEIISE',
      description: 'Ceremonia final para reconocer participación y cerrar oficialmente el evento.',
      location: 'Auditorio principal'
    },
    {
      dayId: 5,
      time: '15:45 - 16:15',
      title: 'Concierto',
      type: 'ACTIVIDAD',
      speaker: 'Grupo artístico',
      description: 'Cierre cultural y social del congreso con una experiencia artística y festiva.',
      location: 'Escenario principal'
    }
  ]
};

export const getDayActivitiesForDay = (dayId: number) => {
  return dayActivityLibrary[dayId] ?? [];
};

export const getDayActivityDetails = (dayId: number, title: string, time: string) => {
  return dayActivityLibrary[dayId]?.find((activity) => activity.title === title && activity.time === time) ?? null;
};
