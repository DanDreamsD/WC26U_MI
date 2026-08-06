export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  explanation: string;
}

export interface QuizDefinition {
  dayId: number;
  title: string;
  questions: QuizQuestion[];
}

export const QUIZ_TOTAL_POINTS = 10;

const buildQuestions = (dayId: number, baseQuestions: QuizQuestion[]) => ({
  dayId,
  title: `Cuestionario del día ${dayId}`,
  questions: baseQuestions
});

export const quizLibrary: Record<number, QuizDefinition> = {
  1: buildQuestions(1, [
    {
      id: '1-1',
      prompt: '¿Qué actividad marca el inicio del evento en el día 1?',
      options: [
        { id: '1-1a', label: 'Check in', isCorrect: true },
        { id: '1-1b', label: 'Visita técnica', isCorrect: false },
        { id: '1-1c', label: 'Feria laboral', isCorrect: false },
        { id: '1-1d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'El Check in es la bienvenida inicial y el primer punto del recorrido del día 1.'
    },
    {
      id: '1-2',
      prompt: '¿Dónde se realiza la inauguración del día 1?',
      options: [
        { id: '1-2a', label: 'Auditorio principal', isCorrect: true },
        { id: '1-2b', label: 'Sala de talleres', isCorrect: false },
        { id: '1-2c', label: 'Área de networking', isCorrect: false },
        { id: '1-2d', label: 'Escenario principal', isCorrect: false }
      ],
      explanation: 'La inauguración del primer día ocurre en el auditorio principal.'
    },
    {
      id: '1-3',
      prompt: '¿Qué tipo de actividad representa el Taller de Innovación?',
      options: [
        { id: '1-3a', label: 'Taller', isCorrect: true },
        { id: '1-3b', label: 'Ceremonia', isCorrect: false },
        { id: '1-3c', label: 'Feria', isCorrect: false },
        { id: '1-3d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'El Taller de Innovación es una actividad práctica de tipo taller.'
    },
    {
      id: '1-4',
      prompt: '¿Cuál actividad promueve la interacción informal entre participantes?',
      options: [
        { id: '1-4a', label: 'Meet & Greet', isCorrect: true },
        { id: '1-4b', label: 'Cierre', isCorrect: false },
        { id: '1-4c', label: 'Inauguración', isCorrect: false },
        { id: '1-4d', label: 'Coffee break', isCorrect: false }
      ],
      explanation: 'El Meet & Greet está pensado para la interacción informal y las conexiones.'
    },
    {
      id: '1-5',
      prompt: '¿Qué actividad cierra el día 1 de forma cultural?',
      options: [
        { id: '1-5a', label: 'Noche cultural', isCorrect: true },
        { id: '1-5b', label: 'Visita técnica', isCorrect: false },
        { id: '1-5c', label: 'Feria laboral', isCorrect: false },
        { id: '1-5d', label: 'Conferencia', isCorrect: false }
      ],
      explanation: 'La noche cultural es la actividad de cierre del primer día.'
    },
    {
      id: '1-6',
      prompt: '¿Cuál es el tipo principal del Check in?',
      options: [
        { id: '1-6a', label: 'REGISTRO', isCorrect: true },
        { id: '1-6b', label: 'PONENCIA', isCorrect: false },
        { id: '1-6c', label: 'ACTIVIDAD', isCorrect: false },
        { id: '1-6d', label: 'CEREMONIA', isCorrect: false }
      ],
      explanation: 'El Check in se clasifica como una actividad de registro.'
    },
    {
      id: '1-7',
      prompt: '¿Qué actividad está diseñada para compartir experiencias y construir redes?',
      options: [
        { id: '1-7a', label: 'Networking', isCorrect: true },
        { id: '1-7b', label: 'Cierre', isCorrect: false },
        { id: '1-7c', label: 'Inauguración', isCorrect: false },
        { id: '1-7d', label: 'Taller', isCorrect: false }
      ],
      explanation: 'El networking busca construir redes y compartir experiencias.'
    },
    {
      id: '1-8',
      prompt: '¿Qué actividad del día 1 se desarrolla en la tarde?',
      options: [
        { id: '1-8a', label: 'Ponencia', isCorrect: true },
        { id: '1-8b', label: 'Check in', isCorrect: false },
        { id: '1-8c', label: 'Inauguración', isCorrect: false },
        { id: '1-8d', label: 'Noche cultural', isCorrect: false }
      ],
      explanation: 'El día 1 incluye ponencias en la tarde para profundizar el contenido.'
    },
    {
      id: '1-9',
      prompt: '¿Qué objetivo principal tiene el día 1?',
      options: [
        { id: '1-9a', label: 'Dar la bienvenida y abrir el evento', isCorrect: true },
        { id: '1-9b', label: 'Realizar visitas técnicas', isCorrect: false },
        { id: '1-9c', label: 'Cerrar el congreso', isCorrect: false },
        { id: '1-9d', label: 'Gestionar ferias laborales', isCorrect: false }
      ],
      explanation: 'El primer día está orientado a dar la bienvenida y abrir el congreso.'
    },
    {
      id: '1-10',
      prompt: '¿Cuál de estas opciones es una actividad del día 1?',
      options: [
        { id: '1-10a', label: 'Taller de Innovación', isCorrect: true },
        { id: '1-10b', label: 'Visita técnica', isCorrect: false },
        { id: '1-10c', label: 'Cierre institucional', isCorrect: false },
        { id: '1-10d', label: 'Feria laboral', isCorrect: false }
      ],
      explanation: 'El Taller de Innovación pertenece al programa del primer día.'
    }
  ]),
  2: buildQuestions(2, [
    {
      id: '2-1',
      prompt: '¿Qué produce la startup Hopnic, presentada por Juan Alberto en el bloque virtual del Día 2?',
      options: [
        { id: '2-1a', label: 'Drones automatizados para el sector agropecuario', isCorrect: false },
        { id: '2-1b', label: 'Prótesis biónicas de miembros superiores impresas en 3D', isCorrect: true },
        { id: '2-1c', label: 'Sensores mecánicos de temperatura para la industria minera', isCorrect: false },
        { id: '2-1d', label: 'Dispositivos portátiles de asistencia médica general', isCorrect: false }
      ],
      explanation: 'Hopnic produce prótesis biónicas de miembros superiores impresas en 3D.'
    },
    {
      id: '2-2',
      prompt: '¿Cómo facilita Hopnic el acceso a sus prótesis para personas de escasos recursos o que trabajan en el sector informal?',
      options: [
        { id: '2-2a', label: 'Exigiendo tarjetas de crédito internacionales y seguros privados costosos', isCorrect: false },
        { id: '2-2b', label: 'Ofreciendo créditos directos sin burocracia, basados en la buena voluntad y la confianza', isCorrect: true },
        { id: '2-2c', label: 'Entregando los productos de manera gratuita únicamente mediante sorteos mensuales', isCorrect: false },
        { id: '2-2d', label: 'Ofreciendo subsidios gubernamentales completos gestionados desde Lima', isCorrect: false }
      ],
      explanation: 'Hopnic ofrece créditos directos sin burocracia, basados en la buena voluntad y la confianza.'
    },
    {
      id: '2-3',
      prompt: '¿Cuál es el lema principal y la filosofía de trabajo que define a la startup de reciclaje Simba?',
      options: [
        { id: '2-3a', label: 'La automatización es la única solución', isCorrect: false },
        { id: '2-3b', label: 'La basura no es basura, nada sobra y nadie sobra', isCorrect: true },
        { id: '2-3c', label: 'Menos costos, mayor producción', isCorrect: false },
        { id: '2-3d', label: 'Tecnología al servicio de las grandes industrias', isCorrect: false }
      ],
      explanation: 'El lema de Simba es: la basura no es basura, nada sobra y nadie sobra.'
    },
    {
      id: '2-4',
      prompt: '¿Cuál es la característica clave de la aplicación móvil Escuela para masificar la educación en sectores con baja conectividad?',
      options: [
        { id: '2-4a', label: 'Requiere teléfonos de última generación y señal 5G', isCorrect: false },
        { id: '2-4b', label: 'Es una tecnología low-tech diseñada para correr en redes 2G o 3G', isCorrect: true },
        { id: '2-4c', label: 'Solo funciona en tabletas distribuidas por el gobierno', isCorrect: false },
        { id: '2-4d', label: 'Solo funciona completamente offline', isCorrect: false }
      ],
      explanation: 'Escuela es una tecnología low-tech diseñada para correr en redes 2G o 3G.'
    },
    {
      id: '2-5',
      prompt: 'Según Lorena Acle, ¿qué es la seguridad psicológica?',
      options: [
        { id: '2-5a', label: 'Tener soporte psicológico en la oficina', isCorrect: false },
        { id: '2-5b', label: 'Poder hablar, equivocarse o disentir sin miedo a ser castigado o humillado', isCorrect: true },
        { id: '2-5c', label: 'Evitar conflictos en el equipo', isCorrect: false },
        { id: '2-5d', label: 'Un examen psicotécnico obligatorio', isCorrect: false }
      ],
      explanation: 'La seguridad psicológica es poder hablar, equivocarse o disentir sin miedo a ser castigado o humillado.'
    },
    {
      id: '2-6',
      prompt: '¿Qué significan las siglas CFR?',
      options: [
        { id: '2-6a', label: 'Control, Finanzas y Rendimiento', isCorrect: false },
        { id: '2-6b', label: 'Conversaciones, Feedback y Reconocimiento', isCorrect: true },
        { id: '2-6c', label: 'Compromiso, Foco y Resultados', isCorrect: false },
        { id: '2-6d', label: 'Capacidad, Fluidez y Resiliencia', isCorrect: false }
      ],
      explanation: 'CFR significa Conversaciones, Feedback y Reconocimiento.'
    },
    {
      id: '2-7',
      prompt: 'En el problema del bate y la pelota, ¿cuánto cuesta la pelota?',
      options: [
        { id: '2-7a', label: 'S/. 0.10', isCorrect: false },
        { id: '2-7b', label: 'S/. 0.05', isCorrect: true },
        { id: '2-7c', label: 'S/. 1.00', isCorrect: false },
        { id: '2-7d', label: 'S/. 0.15', isCorrect: false }
      ],
      explanation: 'En el problema del bate y la pelota, la pelota cuesta S/. 0.05.'
    },
    {
      id: '2-8',
      prompt: '¿A qué sistema de core bancario migró la entidad de Carolina Alarcón en 2022?',
      options: [
        { id: '2-8a', label: 'SAP Banking System', isCorrect: false },
        { id: '2-8b', label: 'Bantotal', isCorrect: true },
        { id: '2-8c', label: 'Oracle FinTech Core', isCorrect: false },
        { id: '2-8d', label: 'Cobol Server', isCorrect: false }
      ],
      explanation: 'La entidad de Carolina Alarcón migró al core bancario Bantotal en 2022.'
    },
    {
      id: '2-9',
      prompt: '¿Qué es 180 Degrees Consulting?',
      options: [
        { id: '2-9a', label: 'Una empresa internacional de auditoría', isCorrect: false },
        { id: '2-9b', label: 'La consultora universitaria más grande del mundo para ONGs y empresas sociales', isCorrect: true },
        { id: '2-9c', label: 'Una aceleradora de startups', isCorrect: false },
        { id: '2-9d', label: 'Un voluntariado ambiental', isCorrect: false }
      ],
      explanation: '180 Degrees Consulting es la consultora universitaria más grande del mundo para ONGs y empresas sociales.'
    },
    {
      id: '2-10',
      prompt: '¿Qué recomendación se dio para Lucky Airlines?',
      options: [
        { id: '2-10a', label: 'Copiar el e-commerce de grandes aerolíneas', isCorrect: false },
        { id: '2-10b', label: 'Monetizar mediante paquetes de experiencias', isCorrect: true },
        { id: '2-10c', label: 'Crear un gran call center', isCorrect: false },
        { id: '2-10d', label: 'Competir agresivamente en precios', isCorrect: false }
      ],
      explanation: 'Para Lucky Airlines se recomendó monetizar mediante paquetes de experiencias.'
    }
  ]),
  3: buildQuestions(3, [
    {
      id: '3-1',
      prompt: '¿En qué país y universidad realizó su intercambio estudiantil de pregrado Daisy Apaco?',
      options: [
        { id: '3-1a', label: 'Universidad de Buenos Aires, Argentina', isCorrect: false },
        { id: '3-1b', label: 'Fundación Universitaria de Popayán, Colombia', isCorrect: true },
        { id: '3-1c', label: 'Universidad de Chile, Chile', isCorrect: false },
        { id: '3-1d', label: 'Universidad del País Vasco, España', isCorrect: false }
      ],
      explanation: 'Daisy Apaco realizó su intercambio estudiantil de pregrado en la Fundación Universitaria de Popayán, Colombia.'
    },
    {
      id: '3-2',
      prompt: '¿Qué idioma se exige para las becas de posgrado en España mencionadas por Daisy Apaco?',
      options: [
        { id: '3-2a', label: 'Inglés avanzado (C1)', isCorrect: false },
        { id: '3-2b', label: 'Español', isCorrect: true },
        { id: '3-2c', label: 'Portugués', isCorrect: false },
        { id: '3-2d', label: 'Francés', isCorrect: false }
      ],
      explanation: 'Las becas de posgrado en España mencionadas exigen el idioma español.'
    },
    {
      id: '3-3',
      prompt: '¿Qué representa la metáfora de "la vaca" mencionada por Daisy Apaco?',
      options: [
        { id: '3-3a', label: 'La riqueza de un negocio familiar', isCorrect: false },
        { id: '3-3b', label: 'La flojera y la zona de confort que impiden avanzar', isCorrect: true },
        { id: '3-3c', label: 'El trabajo operativo en minería', isCorrect: false },
        { id: '3-3d', label: 'La planificación estratégica de la demanda', isCorrect: false }
      ],
      explanation: 'La metáfora de la vaca representa la flojera y la zona de confort que impiden avanzar.'
    },
    {
      id: '3-4',
      prompt: '¿En qué año se fundó oficialmente la organización estudiantil ISE (antes IS)?',
      options: [
        { id: '3-4a', label: 'Diciembre de 2017', isCorrect: false },
        { id: '3-4b', label: 'Febrero de 2020', isCorrect: true },
        { id: '3-4c', label: 'Enero de 2024', isCorrect: false },
        { id: '3-4d', label: 'Agosto de 2026', isCorrect: false }
      ],
      explanation: 'La organización estudiantil ISE (antes IS) se fundó oficialmente en febrero de 2020.'
    },
    {
      id: '3-5',
      prompt: '¿De qué empresa es Gerente Administrativo y Comercial Víctor Maldonado?',
      options: [
        { id: '3-5a', label: 'Estilos', isCorrect: false },
        { id: '3-5b', label: 'Grupo Sander (Perú - Bolivia)', isCorrect: true },
        { id: '3-5c', label: 'Sodimac Constructor', isCorrect: false },
        { id: '3-5d', label: 'Grupo F Curazao', isCorrect: false }
      ],
      explanation: 'Víctor Maldonado es Gerente Administrativo y Comercial de Grupo Sander (Perú - Bolivia).'
    },
    {
      id: '3-6',
      prompt: 'Según Víctor Maldonado, ¿cuál es el error más común en la gestión logística?',
      options: [
        { id: '3-6a', label: 'Comprar insumos a precios elevados', isCorrect: false },
        { id: '3-6b', label: 'La falta de planificación estratégica', isCorrect: true },
        { id: '3-6c', label: 'Tener almacenes propios muy pequeños', isCorrect: false },
        { id: '3-6d', label: 'No utilizar inteligencia artificial', isCorrect: false }
      ],
      explanation: 'El error más común en la gestión logística es la falta de planificación estratégica.'
    },
    {
      id: '3-7',
      prompt: '¿Cuál es la consecuencia directa del understock según Víctor Maldonado?',
      options: [
        { id: '3-7a', label: 'Incremento de costos de almacenamiento', isCorrect: false },
        { id: '3-7b', label: 'Pérdida directa de ventas', isCorrect: true },
        { id: '3-7c', label: 'Aumento del capital inmovilizado', isCorrect: false },
        { id: '3-7d', label: 'Riesgo de obsolescencia', isCorrect: false }
      ],
      explanation: 'La consecuencia directa del understock es la pérdida directa de ventas.'
    },
    {
      id: '3-8',
      prompt: '¿En qué tres categorías dividió Amat Husén los métodos de pronóstico de demanda?',
      options: [
        { id: '3-8a', label: 'Costos de almacenamiento, transporte y mermas', isCorrect: false },
        { id: '3-8b', label: 'Series de tiempo, regresión y distribuciones aleatorias', isCorrect: true },
        { id: '3-8c', label: 'Inventarios Clase A, B y C', isCorrect: false },
        { id: '3-8d', label: 'Promedio móvil, Holt-Winter y modelos ARMA', isCorrect: false }
      ],
      explanation: 'Amat Husén dividió los métodos de pronóstico de demanda en series de tiempo, regresión y distribuciones aleatorias.'
    },
    {
      id: '3-9',
      prompt: '¿Qué significa que un modelo tenga overfitting?',
      options: [
        { id: '3-9a', label: 'Tiene mucho error en entrenamiento y prueba', isCorrect: false },
        { id: '3-9b', label: 'Memoriza el entrenamiento pero falla con datos nuevos', isCorrect: true },
        { id: '3-9c', label: 'Predice con 100% de exactitud', isCorrect: false },
        { id: '3-9d', label: 'No necesita datos históricos', isCorrect: false }
      ],
      explanation: 'El overfitting ocurre cuando el modelo memoriza el entrenamiento pero falla con datos nuevos.'
    },
    {
      id: '3-10',
      prompt: '¿Cuál fue la frase de cierre de Amat Husén?',
      options: [
        { id: '3-10a', label: 'La basura no es basura, nada sobra', isCorrect: false },
        { id: '3-10b', label: 'Sin datos, solo eres otra persona con una opinión', isCorrect: true },
        { id: '3-10c', label: 'No puede impedirse el viento, pero pueden construirse molinos', isCorrect: false },
        { id: '3-10d', label: 'Mi beca no fue por suerte, fue por estrategia', isCorrect: false }
      ],
      explanation: 'La frase de cierre de Amat Husén fue: sin datos, solo eres otra persona con una opinión.'
    }
  ]),
  4: buildQuestions(4, [
    {
      id: '4-1',
      prompt: '¿Qué enfoque destaca en el día 4?',
      options: [
        { id: '4-1a', label: 'Innovación aplicada', isCorrect: true },
        { id: '4-1b', label: 'Registro de asistencia', isCorrect: false },
        { id: '4-1c', label: 'Conferencia de apertura', isCorrect: false },
        { id: '4-1d', label: 'Ceremonia de cierre', isCorrect: false }
      ],
      explanation: 'El día 4 se enfoca en explorar innovación aplicada y nuevas soluciones.'
    },
    {
      id: '4-2',
      prompt: '¿Qué actividad del día 4 es de networking?',
      options: [
        { id: '4-2a', label: 'Hub de Innovación Aplicada', isCorrect: true },
        { id: '4-2b', label: 'Check in', isCorrect: false },
        { id: '4-2c', label: 'Cierre', isCorrect: false },
        { id: '4-2d', label: 'Taller de logística', isCorrect: false }
      ],
      explanation: 'El hub de innovación aplicada está enfocado en networking y prototipos.'
    },
    {
      id: '4-3',
      prompt: '¿Qué tipo de actividad es la ponencia del día 4?',
      options: [
        { id: '4-3a', label: 'PONENCIA', isCorrect: true },
        { id: '4-3b', label: 'REGISTRO', isCorrect: false },
        { id: '4-3c', label: 'FERIA', isCorrect: false },
        { id: '4-3d', label: 'ACTIVIDAD', isCorrect: false }
      ],
      explanation: 'La ponencia del día 4 es una sesión de tipo ponencia.'
    },
    {
      id: '4-4',
      prompt: '¿Qué se explora en el hub de innovación?',
      options: [
        { id: '4-4a', label: 'Proyectos y prototipos', isCorrect: true },
        { id: '4-4b', label: 'Asistencia', isCorrect: false },
        { id: '4-4c', label: 'Check in', isCorrect: false },
        { id: '4-4d', label: 'Registro de entradas', isCorrect: false }
      ],
      explanation: 'El hub de innovación se orienta a proyectos, prototipos y colaboración.'
    },
    {
      id: '4-5',
      prompt: '¿Qué actividad del día 4 ayuda a cerrar conexiones?',
      options: [
        { id: '4-5a', label: 'Meet & Greet', isCorrect: true },
        { id: '4-5b', label: 'Taller de logística', isCorrect: false },
        { id: '4-5c', label: 'Concierto', isCorrect: false },
        { id: '4-5d', label: 'Inauguración', isCorrect: false }
      ],
      explanation: 'El Meet & Greet es el momento de cierre de conexiones del día 4.'
    },
    {
      id: '4-6',
      prompt: '¿Qué actividad del día 4 se desarrolla al final de la jornada?',
      options: [
        { id: '4-6a', label: 'Meet & Greet', isCorrect: true },
        { id: '4-6b', label: 'Feria laboral', isCorrect: false },
        { id: '4-6c', label: 'Check in', isCorrect: false },
        { id: '4-6d', label: 'Visita técnica', isCorrect: false }
      ],
      explanation: 'El Meet & Greet finaliza la jornada del día 4.'
    },
    {
      id: '4-7',
      prompt: '¿Qué temática se promueve en la ponencia del día 4?',
      options: [
        { id: '4-7a', label: 'Innovación y transformación', isCorrect: true },
        { id: '4-7b', label: 'Registro y control', isCorrect: false },
        { id: '4-7c', label: 'Cierre institucional', isCorrect: false },
        { id: '4-7d', label: 'Concierto artístico', isCorrect: false }
      ],
      explanation: 'La ponencia del día 4 está orientada a innovación y transformación.'
    },
    {
      id: '4-8',
      prompt: '¿Cuál de estas actividades es más práctica que ceremonial?',
      options: [
        { id: '4-8a', label: 'Hub de Innovación Aplicada', isCorrect: true },
        { id: '4-8b', label: 'Inauguración', isCorrect: false },
        { id: '4-8c', label: 'Ceremonia de cierre', isCorrect: false },
        { id: '4-8d', label: 'Check in', isCorrect: false }
      ],
      explanation: 'El hub de innovación aplicada tiene un enfoque más práctico.'
    },
    {
      id: '4-9',
      prompt: '¿Qué nivel de enfoque tiene el día 4?',
      options: [
        { id: '4-9a', label: 'Aplicado y colaborativo', isCorrect: true },
        { id: '4-9b', label: 'Solo registro', isCorrect: false },
        { id: '4-9c', label: 'Solo ceremonia', isCorrect: false },
        { id: '4-9d', label: 'Solo descanso', isCorrect: false }
      ],
      explanation: 'El cuarto día se caracteriza por un enfoque aplicado y colaborativo.'
    },
    {
      id: '4-10',
      prompt: '¿Qué opción representa mejor el espíritu del día 4?',
      options: [
        { id: '4-10a', label: 'Soluciones innovadoras', isCorrect: true },
        { id: '4-10b', label: 'Registro de asistencia', isCorrect: false },
        { id: '4-10c', label: 'Recepción inicial', isCorrect: false },
        { id: '4-10d', label: 'Cierre cultural', isCorrect: false }
      ],
      explanation: 'El día 4 está orientado a soluciones innovadoras y nuevas ideas.'
    }
  ]),
  5: buildQuestions(5, [
    {
      id: '5-1',
      prompt: '¿Cuál actividad representa el cierre del evento?',
      options: [
        { id: '5-1a', label: 'Cierre', isCorrect: true },
        { id: '5-1b', label: 'Check in', isCorrect: false },
        { id: '5-1c', label: 'Visita técnica', isCorrect: false },
        { id: '5-1d', label: 'Feria laboral', isCorrect: false }
      ],
      explanation: 'El cierre institucional corresponde al último bloque del día 5.'
    },
    {
      id: '5-2',
      prompt: '¿Qué actividad del día 5 sintetiza aprendizajes?',
      options: [
        { id: '5-2a', label: 'Ponencia de cierre', isCorrect: true },
        { id: '5-2b', label: 'Check in', isCorrect: false },
        { id: '5-2c', label: 'Feria laboral', isCorrect: false },
        { id: '5-2d', label: 'Taller de logística', isCorrect: false }
      ],
      explanation: 'La ponencia de cierre sintetiza aprendizajes y deja mensajes finales.'
    },
    {
      id: '5-3',
      prompt: '¿Qué actividad del día 5 permite debatir ideas abiertas?',
      options: [
        { id: '5-3a', label: 'Conversatorio', isCorrect: true },
        { id: '5-3b', label: 'Check in', isCorrect: false },
        { id: '5-3c', label: 'Cierre', isCorrect: false },
        { id: '5-3d', label: 'Feria laboral', isCorrect: false }
      ],
      explanation: 'El conversatorio promueve el debate abierto de ideas y experiencias.'
    },
    {
      id: '5-4',
      prompt: '¿Qué tipo de actividad es el Taller de Liderazgo?',
      options: [
        { id: '5-4a', label: 'Taller', isCorrect: true },
        { id: '5-4b', label: 'Ceremonia', isCorrect: false },
        { id: '5-4c', label: 'Registro', isCorrect: false },
        { id: '5-4d', label: 'Feria', isCorrect: false }
      ],
      explanation: 'El taller de liderazgo es una actividad práctica de tipo taller.'
    },
    {
      id: '5-5',
      prompt: '¿Qué actividad del día 5 agrega una experiencia artística?',
      options: [
        { id: '5-5a', label: 'Concierto', isCorrect: true },
        { id: '5-5b', label: 'Feria laboral', isCorrect: false },
        { id: '5-5c', label: 'Inauguración', isCorrect: false },
        { id: '5-5d', label: 'Check in', isCorrect: false }
      ],
      explanation: 'El concierto cierra el evento con una experiencia artística y festiva.'
    },
    {
      id: '5-6',
      prompt: '¿Qué actividad del día 5 busca fortalecer trabajo en equipo?',
      options: [
        { id: '5-6a', label: 'Taller de Liderazgo', isCorrect: true },
        { id: '5-6b', label: 'Concierto', isCorrect: false },
        { id: '5-6c', label: 'Check in', isCorrect: false },
        { id: '5-6d', label: 'Feria laboral', isCorrect: false }
      ],
      explanation: 'El taller de liderazgo impulsa el trabajo en equipo y la colaboración.'
    },
    {
      id: '5-7',
      prompt: '¿Qué actividad del día 5 se enfoca en reconocer la participación?',
      options: [
        { id: '5-7a', label: 'Cierre', isCorrect: true },
        { id: '5-7b', label: 'Visitas técnicas', isCorrect: false },
        { id: '5-7c', label: 'Coffee break', isCorrect: false },
        { id: '5-7d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'El cierre reconoce la participación y entrega mensajes finales.'
    },
    {
      id: '5-8',
      prompt: '¿Qué actividad del día 5 promueve la participación activa del público?',
      options: [
        { id: '5-8a', label: 'Conversatorio', isCorrect: true },
        { id: '5-8b', label: 'Check in', isCorrect: false },
        { id: '5-8c', label: 'Registro', isCorrect: false },
        { id: '5-8d', label: 'Cierre', isCorrect: false }
      ],
      explanation: 'El conversatorio abre el espacio a la participación del público.'
    },
    {
      id: '5-9',
      prompt: '¿Cuál de estas actividades pertenece al final del evento?',
      options: [
        { id: '5-9a', label: 'Concierto', isCorrect: true },
        { id: '5-9b', label: 'Check in', isCorrect: false },
        { id: '5-9c', label: 'Feria laboral', isCorrect: false },
        { id: '5-9d', label: 'Visitas técnicas', isCorrect: false }
      ],
      explanation: 'El concierto es una actividad de cierre cultural del evento.'
    },
    {
      id: '5-10',
      prompt: '¿Qué opción representa mejor el cierre institucional del día 5?',
      options: [
        { id: '5-10a', label: 'Cierre', isCorrect: true },
        { id: '5-10b', label: 'Meet & Greet', isCorrect: false },
        { id: '5-10c', label: 'Check in', isCorrect: false },
        { id: '5-10d', label: 'Taller de logística', isCorrect: false }
      ],
      explanation: 'El cierre institucional resume la participación y cierra oficialmente el evento.'
    }
  ])
};

export const getQuizForDay = (dayId: number) => quizLibrary[dayId] ?? null;

export const getQuizScore = (quiz: QuizDefinition, answers: Record<string, string>) => {
  return quiz.questions.reduce((score, question) => {
    const selectedOption = question.options.find((option) => option.id === answers[question.id]);
    return score + (selectedOption?.isCorrect ? 1 : 0);
  }, 0);
};
