export interface DayActivityDetail {
  dayId: number;
  time: string;
  title: string;
  type: string;
  speaker: string;
  description: string;
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
      description: 'Presentación musical para dar inicio al congreso con energía',
    },
    {
      dayId: 1,
      time: '09:45 - 10:00',
      title: 'Inauguración',
      type: 'CEREMONIA',
      speaker: 'Directiva CEIISE',
      description: 'Ceremonia de apertura con palabras de bienvenida y presentación del programa.',
    },
    {
      dayId: 1,
      time: '10:00 - 10:45',
      title: 'Empleabilidad y nuevas exigencias del mercado laboral',
      type: 'PONENCIA',
      speaker: 'Juan Pablo Sinarahua Terrones',
      description: 'CEO Laboral IA',
    },
    {
      dayId: 1,
      time: '10:45 - 11:00',
      title: 'Liderazgo práctico para jóvenes profesionales',
      type: 'TALLER',
      speaker: 'Claudia Melisa Zapana Vilca',
      description: 'Taller práctico para explorar habilidades de liderazgo aplicadas al entorno profesional.',
    },
    {
      dayId: 1,
      time: '11:00 - 11:45',
      title: 'Meet & Greet',
      type: 'NETWORKING',
      speaker: 'Ponentes y participantes',
      description: 'Espacio para conversar con especialistas, organizadores y otros asistentes.',
    },
    {
      dayId: 1,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar antes de las sesiones de la tarde.',
    },
    {
      dayId: 1,
      time: '14:00 - 14:30',
      title: 'Estrategias para generar oportunidades laborales a través de tu marca personal',
      type: 'PONENCIA',
      speaker: 'Carla Silva Santisteban Vásquez',
      description: 'Aprende a construir una marca personal sólida en LinkedIn para potenciar tu perfil profesional.',
    },
    {
      dayId: 1,
      time: '15:30 - 15:45',
      title: 'Competencias profesionales para destacar en la industria actual',
      type: 'PONENCIA',
      speaker: 'María Laura Herrera Falcón',
      description: 'Descubre el perfil profesional que mejor se adapta a ti y las competencias clave para destacar en la industria como ingeniero industrial.',
    },
    {
      dayId: 1,
      time: '16:15 - 18:00',
      title: 'Noche cultural',
      type: 'ACTIVIDAD',
      speaker: 'Equipo cultural',
      description: 'Actividades para cerrar el día con una experiencia memorable.',
    }
  ],
  2: [
    {
      dayId: 2,
      time: '09:45 - 12:30',
      title: 'Espacio de visitas técnicas',
      type: 'VISITAS TÉCNICAS',
      speaker: 'Empresas invitadas',
      description: 'Espacio para el desarrollo de la visita técnica de tu elección.',
    },
    {
      dayId: 2,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar.',
    },
    {
      dayId: 2,
      time: '14:30 - 15:15',
      title: 'Historias reales de crecimiento profesional y liderazgo',
      type: 'TALK EXPERIENCE',
      speaker: 'Carolina Alarcón Granda',
      description: 'Descubre cómo el ingeniero industrial puede liderar la transformación tecnológica y la inclusión financiera, generando un impacto más allá de la industria tradicional.',
    },
    {
      dayId: 2,
      time: '15:30 - 16:15',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Charla para reforzar herramientas y estrategias de desarrollo profesional.',
    },
    {
      dayId: 2,
      time: '16:15 - 17:45',
      title: 'Feria de voluntariados',
      type: 'NETWORKING',
      speaker: 'Diversos voluntariados',
      description: 'Espacio de encuentro para aprender sobre iniciativas de apoyo, voluntariado y participación.',
    },
    {
      dayId: 2,
      time: '18:00 - 18:30',
      title: 'Meet & Greet',
      type: 'NETWORKING',
      speaker: 'Ponentes y participantes',
      description: 'Cierre del día con un espacio de interacción informal entre ponentes y asistentes.',
    }
  ],
  3: [
    {
      dayId: 3,
      time: '09:45 - 12:30',
      title: 'Espacio de visita técnica',
      type: 'VISITAS TÉCNICAS',
      speaker: 'Empresas invitadas',
      description: 'Espacio para el desarrollo de la visita técnica de tu elección.',
    },
    {
      dayId: 3,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar.',
    },
    {
      dayId: 3,
      time: '14:00 - 16:15',
      title: 'Feria laboral y Hub de innovación aplicada',
      type: 'FERIA LABORAL',
      speaker: 'Empresas y organizaciones',
      description: 'Un espacio donde los participantes presenten, desarrollen o conecten propuestas innovadoras aplicadas a problemáticas académicas, empresariales o industriales.',
    },
    {
      dayId: 3,
      time: '16:15 - 17:00',
      title: 'Supply Chain Challenge: optimización de una cadena de suministro',
      type: 'TALLER',
      speaker: 'Próximamente',
      description: 'Fortalece tus habilidades en gestión logística mediante la resolución práctica de desafíos reales en una cadena de suministro, optimizando decisiones sobre demanda, inventarios, proveedores y distribución.',
    },
    {
      dayId: 3,
      time: '17:00 - 17:45',
      title: 'Logística sostenible y tecnologías aplicadas',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia enfocada en buenas prácticas y tendencias de mejora en operaciones logísticas.',
    },
    {
      dayId: 3,
      time: '17:45 - 18:00',
      title: 'Coffee Break',
      type: 'BREAK',
      speaker: 'Equipo de logística',
      description: 'Rango de descanso para reactivar y conversar entre sesiones.',
    }
  ],
  4: [
    {
      dayId: 4,
      time: '09:45 - 12:30',
      title: 'Espacio de visita técnica',
      type: 'VISITAS TÉCNICAS',
      speaker: 'Empresas invitadas',
      description: 'Espacio para el desarrollo de la visita técnica de tu elección.',
    },
    {
      dayId: 4,
      time: '15:15 - 16:00',
      title: 'SUPPLY CHAIN',
      type: 'PONENCIA VIRTUAL',
      speaker: 'OSCAR SOZA',
      description: 'Explora cómo la logística inteligente combina datos, tecnología y estrategia para optimizar la cadena de suministro y potenciar la competitividad empresarial.',
    },
    {
      dayId: 4,
      time: '16:00 - 16:15',
      title: 'Design Thinking aplicado a la solución de problemas',
      type: 'PONENCIA VIRTUAL',
      speaker: 'Próximo a revelarse',
      description: '',
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
    },
    {
      dayId: 5,
      time: '10:00 - 10:45',
      title: 'Innovar con tecnología: el futuro de las ingenierías',
      type: 'PONENCIA',
      speaker: 'Jeanmarco Villegas',
      description: 'Descubre cómo los ingenieros pueden convertir la tecnología en soluciones estratégicas que impulsen la innovación y generen valor para las empresas.',
    },
    {
      dayId: 5,
      time: '11:00 - 12:30',
      title: 'Retos reales de la transformación digital en empresas peruanas',
      type: 'CONVERSATORIO',
      speaker: 'Próximamente',
      description: 'Conoce las principales barreras, oportunidades y experiencias reales que enfrentan las organizaciones en sus procesos de transformación digital de la mano de expertos.',
    },
    {
      dayId: 5,
      time: '12:30 - 14:00',
      title: 'Buffet y Fotos',
      type: 'BREAK',
      speaker: '',
      description: 'Buffet de cierre y sesión de fotos para conmemorar la participación en el congreso.',
    },
    {
      dayId: 5,
      time: '14:30 - 15:30',
      title: 'Design Thinking aplicado a problemas reales',
      type: 'TALLER',
      speaker: 'Clarissa Palomino',
      description: 'Aprende a transformar una idea o problema en un prototipo funcional mediante un enfoque práctico orientado a resolver desafíos del mundo real.',
    },
    {
      dayId: 5,
      time: '15:30 - 15:45',
      title: 'Cierre',
      type: 'CEREMONIA',
      speaker: 'Directiva CEIISE',
      description: 'Ceremonia final para reconocer participación y cerrar oficialmente el evento.',
    },
    {
      dayId: 5,
      time: '15:45 - 16:15',
      title: 'Concierto',
      type: 'ACTIVIDAD',
      speaker: 'Grupo artístico',
      description: 'Cierre cultural y social del congreso con una experiencia artística y festiva.',
    }
  ]
};

export const getDayActivitiesForDay = (dayId: number) => {
  return dayActivityLibrary[dayId] ?? [];
};

export const getDayActivityDetails = (dayId: number, title: string, time: string) => {
  return dayActivityLibrary[dayId]?.find((activity) => activity.title === title && activity.time === time) ?? null;
};
