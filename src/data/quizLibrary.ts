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
      prompt: '¿Cuál actividad define mejor el día 2?',
      options: [
        { id: '2-1a', label: 'Visitas técnicas', isCorrect: true },
        { id: '2-1b', label: 'Check in', isCorrect: false },
        { id: '2-1c', label: 'Cierre', isCorrect: false },
        { id: '2-1d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'El día 2 está centrado en visitas técnicas.'
    },
    {
      id: '2-2',
      prompt: '¿Qué tipo de actividad aparece en la tarde del día 2?',
      options: [
        { id: '2-2a', label: 'Ponencia', isCorrect: true },
        { id: '2-2b', label: 'Check in', isCorrect: false },
        { id: '2-2c', label: 'Registro', isCorrect: false },
        { id: '2-2d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'El día 2 incluye ponencias en varias franjas de la tarde.'
    },
    {
      id: '2-3',
      prompt: '¿Qué espacio se utiliza para la feria de voluntarios?',
      options: [
        { id: '2-3a', label: 'Área de participación', isCorrect: true },
        { id: '2-3b', label: 'Auditorio principal', isCorrect: false },
        { id: '2-3c', label: 'Entrada principal', isCorrect: false },
        { id: '2-3d', label: 'Escenario principal', isCorrect: false }
      ],
      explanation: 'La feria de voluntarios se desarrolla en el área de participación.'
    },
    {
      id: '2-4',
      prompt: '¿Qué actividad busca promover participación social?',
      options: [
        { id: '2-4a', label: 'Feria de voluntarios', isCorrect: true },
        { id: '2-4b', label: 'Noche cultural', isCorrect: false },
        { id: '2-4c', label: 'Concierto', isCorrect: false },
        { id: '2-4d', label: 'Check in', isCorrect: false }
      ],
      explanation: 'La feria de voluntarios busca promover participación y colaboración comunitaria.'
    },
    {
      id: '2-5',
      prompt: '¿Qué actividad del día 2 está enfocada en aprendizaje práctico?',
      options: [
        { id: '2-5a', label: 'Visitas técnicas', isCorrect: true },
        { id: '2-5b', label: 'Cierre', isCorrect: false },
        { id: '2-5c', label: 'Inauguración', isCorrect: false },
        { id: '2-5d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'Las visitas técnicas ofrecen aprendizajes prácticos y contextualizados.'
    },
    {
      id: '2-6',
      prompt: '¿Qué actividad del día 2 usa el espacio de networking?',
      options: [
        { id: '2-6a', label: 'Feria de voluntarios', isCorrect: true },
        { id: '2-6b', label: 'Check in', isCorrect: false },
        { id: '2-6c', label: 'Inauguración', isCorrect: false },
        { id: '2-6d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'La feria de voluntarios es una actividad de networking social.'
    },
    {
      id: '2-7',
      prompt: '¿Qué enfoque se enfatiza en las ponencias del día 2?',
      options: [
        { id: '2-7a', label: 'Tendencias del día', isCorrect: true },
        { id: '2-7b', label: 'Registro de entradas', isCorrect: false },
        { id: '2-7c', label: 'Ceremonia de apertura', isCorrect: false },
        { id: '2-7d', label: 'Concierto artístico', isCorrect: false }
      ],
      explanation: 'Las ponencias del día 2 abordan tendencias y reflexiones del día.'
    },
    {
      id: '2-8',
      prompt: '¿Cuál de estas opciones no corresponde al día 2?',
      options: [
        { id: '2-8a', label: 'Noche cultural', isCorrect: true },
        { id: '2-8b', label: 'Visitas técnicas', isCorrect: false },
        { id: '2-8c', label: 'Feria de voluntarios', isCorrect: false },
        { id: '2-8d', label: 'Ponencia', isCorrect: false }
      ],
      explanation: 'La noche cultural no forma parte del esquema principal del día 2.'
    },
    {
      id: '2-9',
      prompt: '¿Qué actividad del día 2 se concentra en la participación comunitaria?',
      options: [
        { id: '2-9a', label: 'Feria de voluntarios', isCorrect: true },
        { id: '2-9b', label: 'Check in', isCorrect: false },
        { id: '2-9c', label: 'Visita técnica', isCorrect: false },
        { id: '2-9d', label: 'Cierre', isCorrect: false }
      ],
      explanation: 'La feria de voluntarios busca impulsar participación y vínculos comunitarios.'
    },
    {
      id: '2-10',
      prompt: '¿Cuál de estas actividades está planeada para el final del día 2?',
      options: [
        { id: '2-10a', label: 'Ponencia de cierre', isCorrect: true },
        { id: '2-10b', label: 'Check in', isCorrect: false },
        { id: '2-10c', label: 'Inauguración', isCorrect: false },
        { id: '2-10d', label: 'Visitas técnicas', isCorrect: false }
      ],
      explanation: 'El cierre temático del día 2 se presenta como una ponencia final.'
    }
  ]),
  3: buildQuestions(3, [
    {
      id: '3-1',
      prompt: '¿Qué espacio destaca en el programa del día 3?',
      options: [
        { id: '3-1a', label: 'Feria laboral', isCorrect: true },
        { id: '3-1b', label: 'Noche cultural', isCorrect: false },
        { id: '3-1c', label: 'Inauguración', isCorrect: false },
        { id: '3-1d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'La feria laboral es una de las actividades centrales del tercer día.'
    },
    {
      id: '3-2',
      prompt: '¿Cuál actividad del día 3 es de carácter técnico?',
      options: [
        { id: '3-2a', label: 'Visitas técnicas', isCorrect: true },
        { id: '3-2b', label: 'Meet & Greet', isCorrect: false },
        { id: '3-2c', label: 'Concierto', isCorrect: false },
        { id: '3-2d', label: 'Cierre', isCorrect: false }
      ],
      explanation: 'Las visitas técnicas son el componente especializado del tercer día.'
    },
    {
      id: '3-3',
      prompt: '¿Qué tipo de actividad corresponde al Taller de Logística?',
      options: [
        { id: '3-3a', label: 'Taller', isCorrect: true },
        { id: '3-3b', label: 'Conferencia', isCorrect: false },
        { id: '3-3c', label: 'Ceremonia', isCorrect: false },
        { id: '3-3d', label: 'Networking', isCorrect: false }
      ],
      explanation: 'El taller de logística se enfoca en una actividad práctica.'
    },
    {
      id: '3-4',
      prompt: '¿Qué actividad del día 3 aporta oportunidad laboral?',
      options: [
        { id: '3-4a', label: 'Feria laboral', isCorrect: true },
        { id: '3-4b', label: 'Check in', isCorrect: false },
        { id: '3-4c', label: 'Noche cultural', isCorrect: false },
        { id: '3-4d', label: 'Visitas técnicas', isCorrect: false }
      ],
      explanation: 'La feria laboral permite conocer oportunidades y vacantes.'
    },
    {
      id: '3-5',
      prompt: '¿Qué actividad ofrece un descanso entre sesiones?',
      options: [
        { id: '3-5a', label: 'Coffee Break', isCorrect: true },
        { id: '3-5b', label: 'Cierre', isCorrect: false },
        { id: '3-5c', label: 'Taller de logística', isCorrect: false },
        { id: '3-5d', label: 'Inauguración', isCorrect: false }
      ],
      explanation: 'El coffee break es la pausa de descanso del día 3.'
    },
    {
      id: '3-6',
      prompt: '¿Qué actividad del día 3 se desarrolla en el pabellón de ferias?',
      options: [
        { id: '3-6a', label: 'Feria laboral', isCorrect: true },
        { id: '3-6b', label: 'Cierre', isCorrect: false },
        { id: '3-6c', label: 'Coffee break', isCorrect: false },
        { id: '3-6d', label: 'Visitas técnicas', isCorrect: false }
      ],
      explanation: 'La feria laboral se organiza en el pabellón de ferias.'
    },
    {
      id: '3-7',
      prompt: '¿Qué actividad del día 3 se enfoca en operaciones logísticas?',
      options: [
        { id: '3-7a', label: 'Taller de Logística', isCorrect: true },
        { id: '3-7b', label: 'Noche cultural', isCorrect: false },
        { id: '3-7c', label: 'Inauguración', isCorrect: false },
        { id: '3-7d', label: 'Concierto', isCorrect: false }
      ],
      explanation: 'El taller de logística está centrado en operaciones y cadena de valor.'
    },
    {
      id: '3-8',
      prompt: '¿Qué actividad del día 3 está relacionada con empresas y organizaciones?',
      options: [
        { id: '3-8a', label: 'Feria laboral', isCorrect: true },
        { id: '3-8b', label: 'Concierto', isCorrect: false },
        { id: '3-8c', label: 'Check in', isCorrect: false },
        { id: '3-8d', label: 'Cierre', isCorrect: false }
      ],
      explanation: 'La feria laboral reúne a empresas y organizaciones.'
    },
    {
      id: '3-9',
      prompt: '¿Qué tipo de evento ofrece la feria laboral?',
      options: [
        { id: '3-9a', label: 'FERIA', isCorrect: true },
        { id: '3-9b', label: 'REGISTRO', isCorrect: false },
        { id: '3-9c', label: 'CEREMONIA', isCorrect: false },
        { id: '3-9d', label: 'ACTIVIDAD', isCorrect: false }
      ],
      explanation: 'La feria laboral se clasifica como un evento de tipo feria.'
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
