export interface DayActivityDetail {
  dayId: number;
  time: string;
  title: string;
  type: string;
  speaker: string;
  description: string;
  objectives: string[];
  highlights: string[];
  location: string;
  requiresTicket?: string;
}

export const dayActivityLibrary: Record<number, DayActivityDetail[]> = {
  1: [
    {
      dayId: 1,
      time: '08:30 - 09:15',
      title: 'Recepción y networking',
      type: 'REGISTRO',
      speaker: 'Staff CEIISE',
      description: 'Recepción inicial para entregar credenciales, bienvenida y networking entre participantes.',
      objectives: ['Recepción de asistentes', 'Entrega de materiales', 'Networking inicial'],
      highlights: ['Punto de bienvenida', 'Control de acceso', 'Conexiones tempranas'],
      location: 'Entrada principal'
    },
    {
      dayId: 1,
      time: '09:15 - 09:45',
      title: 'Número musical',
      type: 'ACTIVIDAD',
      speaker: 'Grupo artístico',
      description: 'Presentación musical para dar inicio al congreso con energía y espíritu de comunidad.',
      objectives: ['Ambientar el evento', 'Integrar a los asistentes', 'Generar entusiasmo'],
      highlights: ['Presentación en vivo', 'Ambiente festivo', 'Inicio memorable'],
      location: 'Auditorio principal'
    },
    {
      dayId: 1,
      time: '09:45 - 10:00',
      title: 'Inauguración',
      type: 'CEREMONIA',
      speaker: 'Directiva CEIISE',
      description: 'Ceremonia de apertura con palabras de bienvenida y presentación del programa.',
      objectives: ['Abrir el congreso', 'Presentar objetivos del evento', 'Motivar a los asistentes'],
      highlights: ['Palabras de bienvenida', 'Presentación institucional', 'Inicio del recorrido'],
      location: 'Auditorio principal'
    },
    {
      dayId: 1,
      time: '10:00 - 10:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia inicial del día orientada a la empleabilidad y el futuro profesional.',
      objectives: ['Introducir la temática', 'Motivar la reflexión', 'Conectar con el público'],
      highlights: ['Contenido especializado', 'Espacio de preguntas', 'Contexto estratégico'],
      location: 'Sala de conferencias'
    },
    {
      dayId: 1,
      time: '10:45 - 11:00',
      title: 'Taller Liderazgo',
      type: 'TALLER',
      speaker: 'Próximamente',
      description: 'Taller práctico para explorar habilidades de liderazgo aplicadas al entorno profesional.',
      objectives: ['Desarrollar liderazgo', 'Ejercitar colaboración', 'Impulsar habilidades blandas'],
      highlights: ['Dinámicas grupales', 'Mentoría guiada', 'Retos prácticos'],
      location: 'Sala de talleres'
    },
    {
      dayId: 1,
      time: '11:00 - 11:45',
      title: 'Meet & Greet',
      type: 'NETWORKING',
      speaker: 'Ponentes y participantes',
      description: 'Espacio informal para conversar con especialistas, organizadores y otros asistentes.',
      objectives: ['Construir redes', 'Intercambiar experiencias', 'Promover conexiones'],
      highlights: ['Networking informal', 'Conexiones profesionales', 'Interacción abierta'],
      location: 'Área de networking'
    },
    {
      dayId: 1,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar antes de las sesiones de la tarde.',
      objectives: ['Descanso', 'Alimentación', 'Socialización libre'],
      highlights: ['Pausa activa', 'Espacio de socialización', 'Recarga de energía'],
      location: 'Área de comidas'
    },
    {
      dayId: 1,
      time: '14:00 - 14:30',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Segunda ponencia del día para ampliar el análisis y cerrar conceptos clave.',
      objectives: ['Profundizar conocimientos', 'Ampliar perspectivas', 'Inspirar aplicación práctica'],
      highlights: ['Análisis especializado', 'Casos de estudio', 'Preguntas del público'],
      location: 'Sala de conferencias'
    },
    {
      dayId: 1,
      time: '15:15 - 15:30',
      title: 'Contingencia',
      type: 'BREAK',
      speaker: '',
      description: 'Espacio de contingencia para ajustes de programa o descanso breve.',
      objectives: ['Flexibilidad', 'Ajuste de agenda', 'Descanso breve'],
      highlights: ['Pausa activa', 'Reorganización', 'Atención al participante'],
      location: 'Área general'
    },
    {
      dayId: 1,
      time: '15:30 - 15:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Sesión complementaria para conectar la teoría con experiencias del sector.',
      objectives: ['Relacionar conceptos', 'Compartir buenas prácticas', 'Abrir reflexión'],
      highlights: ['Experiencias reales', 'Interacción con el público', 'Temas aplicados'],
      location: 'Sala de conferencias'
    },
    {
      dayId: 1,
      time: '16:15 - 18:00',
      title: 'Noche cultural',
      type: 'ACTIVIDAD',
      speaker: 'Equipo cultural',
      description: 'Actividades culturales y de integración para cerrar el día con una experiencia memorable.',
      objectives: ['Integrar participantes', 'Cultura y entretenimiento', 'Cierre del día'],
      highlights: ['Presentación cultural', 'Ambiente social', 'Conexión entre asistentes'],
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
      objectives: ['Observar procesos', 'Entender tecnología', 'Conectar teoría y práctica'],
      highlights: ['Visitas guiadas', 'Casos reales', 'Interacción técnica'],
      location: 'Instalaciones del evento'
    },
    {
      dayId: 2,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar.',
      objectives: ['Descanso', 'Alimentación', 'Socialización libre'],
      highlights: ['Pausa activa', 'Espacio de socialización', 'Recarga de energía'],
      location: 'Área de comidas'
    },
    {
      dayId: 2,
      time: '14:30 - 15:15',
      title: 'Talk Experience',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Sesión enfocada en compartir experiencias profesionales y lecciones de liderazgo estratégico.',
      objectives: ['Actualizar conocimientos', 'Perspectivas de futuro', 'Retroalimentación del día'],
      highlights: ['Contenido vivencial', 'Casos de aplicación', 'Espacio de preguntas'],
      location: 'Sala de conferencias'
    },
    {
      dayId: 2,
      time: '15:15 - 15:30',
      title: 'Contingencia',
      type: 'BREAK',
      speaker: '',
      description: 'Espacio de contingencia para ajustes de programa o descanso breve.',
      objectives: ['Flexibilidad', 'Ajuste de agenda', 'Descanso breve'],
      highlights: ['Pausa activa', 'Reorganización', 'Atención al participante'],
      location: 'Área general'
    },
    {
      dayId: 2,
      time: '15:30 - 16:15',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Charla para reforzar herramientas y estrategias de desarrollo profesional.',
      objectives: ['Reforzar aprendizajes', 'Conectar conceptos', 'Abrir discusión'],
      highlights: ['Enfoque práctico', 'Interacción con el equipo', 'Resumen ejecutivo'],
      location: 'Sala de conferencias'
    },
    {
      dayId: 2,
      time: '16:15 - 17:45',
      title: 'Feria de voluntariados',
      type: 'NETWORKING',
      speaker: 'Diversos voluntariados',
      description: 'Espacio de encuentro para aprender sobre iniciativas de apoyo, voluntariado y participación.',
      objectives: ['Promover participación', 'Compartir causas', 'Conectar con comunidades'],
      highlights: ['Proyectos sociales', 'Voluntariado', 'Oportunidades de colaboración'],
      location: 'Área de participación'
    },
    {
      dayId: 2,
      time: '18:00 - 18:30',
      title: 'Meet & Greet',
      type: 'NETWORKING',
      speaker: 'Ponentes y participantes',
      description: 'Cierre del día con un espacio de interacción informal entre ponentes y asistentes.',
      objectives: ['Consolidar conexiones', 'Interacción abierta', 'Cierre social del día'],
      highlights: ['Networking final', 'Conversación informal', 'Cierre del día'],
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
      objectives: ['Ver operaciones', 'Observar nuevas tecnologías', 'Analizar buenas prácticas'],
      highlights: ['Visitas guiadas', 'Contexto industrial', 'Interacción con expertos'],
      location: 'Instalaciones del evento'
    },
    {
      dayId: 3,
      time: '12:30 - 14:00',
      title: 'Almuerzo libre',
      type: 'BREAK',
      speaker: '',
      description: 'Tiempo libre para almorzar y descansar.',
      objectives: ['Descanso', 'Alimentación', 'Socialización libre'],
      highlights: ['Pausa activa', 'Espacio de socialización', 'Recarga de energía'],
      location: 'Área de comidas'
    },
    {
      dayId: 3,
      time: '14:00 - 16:15',
      title: 'Feria laboral y Hub de innovación',
      type: 'FERIA',
      speaker: 'Empresas y organizaciones',
      description: 'Espacio para explorar oportunidades laborales y proyectos de innovación aplicada.',
      objectives: ['Interactuar con empresas', 'Conocer vacantes', 'Explorar innovación'],
      highlights: ['Stand de empresas', 'Networking profesional', 'Hub de innovación'],
      location: 'Pabellón de ferias'
    },
    {
      dayId: 3,
      time: '16:15 - 17:00',
      title: 'Taller Logística Inteligente',
      type: 'TALLER',
      speaker: 'Próximamente',
      description: 'Taller práctico sobre operaciones logísticas inteligentes y su impacto en la cadena de valor.',
      objectives: ['Comprender procesos logísticos', 'Analizar mejoras', 'Aplicar conceptos'],
      highlights: ['Casos de estudio', 'Herramientas de análisis', 'Trabajo práctico'],
      location: 'Sala de talleres'
    },
    {
      dayId: 3,
      time: '17:00 - 17:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia enfocada en buenas prácticas y tendencias de mejora en operaciones logísticas.',
      objectives: ['Reforzar conocimientos', 'Promover debate', 'Compartir experiencias'],
      highlights: ['Contenido aplicado', 'Perspectiva industrial', 'Espacio de preguntas'],
      location: 'Sala de conferencias'
    },
    {
      dayId: 3,
      time: '17:45 - 18:00',
      title: 'Coffee Break',
      type: 'BREAK',
      speaker: 'Equipo de logística',
      description: 'Rango de descanso para reactivar y conversar entre sesiones.',
      objectives: ['Descanso', 'Conexión informal', 'Refrigerio'],
      highlights: ['Espacio de socialización', 'Pausa activa', 'Atención al participante'],
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
      objectives: ['Comprender contextos reales', 'Observar tecnología', 'Generar conexiones'],
      highlights: ['Experiencia en campo', 'Diálogo técnico', 'Aprendizaje aplicado'],
      location: 'Instalaciones del evento'
    },
    {
      dayId: 4,
      time: '14:30 - 16:15',
      title: 'Ponencia Virtual',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia virtual enfocada en innovación empresarial y metodologías ágiles.',
      objectives: ['Ampliar visión', 'Compartir tendencias', 'Estimular reflexión'],
      highlights: ['Perspectivas de futuro', 'Contenido estratégico', 'Espacio de preguntas'],
      location: 'Plataforma virtual'
    },
    {
      dayId: 4,
      time: '16:15 - 17:45',
      title: 'Ponencia Virtual',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Segunda ponencia virtual del día para profundizar en estrategias de innovación.',
      objectives: ['Consolidar aprendizajes', 'Conectar conceptos', 'Cerrar el día'],
      highlights: ['Enfoque práctico', 'Interacción remota', 'Resumen ejecutivo'],
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
      objectives: ['Recepción de asistentes', 'Organización final', 'Ambiente de cierre'],
      highlights: ['Punto de bienvenida', 'Control de acceso', 'Preparación del cierre'],
      location: 'Entrada principal'
    },
    {
      dayId: 5,
      time: '10:00 - 10:45',
      title: 'Ponencia',
      type: 'PONENCIA',
      speaker: 'Próximamente',
      description: 'Ponencia de cierre orientada a integrar aprendizajes de todo el congreso.',
      objectives: ['Sintetizar aprendizajes', 'Motivar reflexión', 'Preparar cierre'],
      highlights: ['Resumen general', 'Ideas clave', 'Mensaje final'],
      location: 'Sala de conferencias'
    },
    {
      dayId: 5,
      time: '10:45 - 11:00',
      title: 'Contingencia',
      type: 'BREAK',
      speaker: '',
      description: 'Espacio de contingencia para ajustes de programa o descanso breve.',
      objectives: ['Flexibilidad', 'Ajuste de agenda', 'Descanso breve'],
      highlights: ['Pausa activa', 'Reorganización', 'Atención al participante'],
      location: 'Área general'
    },
    {
      dayId: 5,
      time: '11:00 - 12:30',
      title: 'Conversatorio',
      type: 'CONVERSATORIO',
      speaker: 'Próximamente',
      description: 'Conversatorio abierto donde se intercambian visiones y experiencias entre expertos y participantes.',
      objectives: ['Debatir ideas', 'Escuchar opiniones', 'Promover participación'],
      highlights: ['Mesa de diálogo', 'Interacción libre', 'Preguntas del público'],
      location: 'Sala principal'
    },
    {
      dayId: 5,
      time: '12:30 - 14:00',
      title: 'Buffet y Fotos',
      type: 'BREAK',
      speaker: '',
      description: 'Buffet de cierre y sesión de fotos para conmemorar la participación en el congreso.',
      objectives: ['Celebrar participación', 'Capturar recuerdos', 'Socialización final'],
      highlights: ['Buffet exclusivo', 'Sesión de fotos', 'Ambiente de celebración'],
      location: 'Área de comidas'
    },
    {
      dayId: 5,
      time: '14:30 - 15:30',
      title: 'Taller Innovación',
      type: 'TALLER',
      speaker: 'Próximamente',
      description: 'Taller para explorar enfoques creativos e innovación aplicada a retos reales.',
      objectives: ['Generar ideas', 'Ejercitar colaboración', 'Impulsar la innovación'],
      highlights: ['Dinámicas de innovación', 'Casos de aplicación', 'Trabajo colaborativo'],
      location: 'Sala de talleres'
    },
    {
      dayId: 5,
      time: '15:30 - 15:45',
      title: 'Cierre',
      type: 'CEREMONIA',
      speaker: 'Directiva CEIISE',
      description: 'Ceremonia final para reconocer participación y cerrar oficialmente el evento.',
      objectives: ['Cerrar el evento', 'Reconocer participación', 'Entregar mensajes finales'],
      highlights: ['Palabras de cierre', 'Reconocimiento', 'Cierre institucional'],
      location: 'Auditorio principal'
    },
    {
      dayId: 5,
      time: '15:45 - 16:15',
      title: 'Concierto',
      type: 'ACTIVIDAD',
      speaker: 'Grupo artístico',
      description: 'Cierre cultural y social del congreso con una experiencia artística y festiva.',
      objectives: ['Cerrar con alegría', 'Integrar participantes', 'Fortalecer ambiente'],
      highlights: ['Presentación artística', 'Ambiente festivo', 'Cierre social'],
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
