export type DaySessionType = 'PONENCIA' | 'TALLER' | 'BUSINESS CASE';

export interface DaySummaryConcept {
  title: string;
  points: string[];
}

export interface DaySummarySession {
  type: DaySessionType;
  title: string;
  speaker: string;
  block?: string;
  concepts: DaySummaryConcept[];
}

export interface DaySummary {
  dayId: number;
  title: string;
  subtitle: string;
  sessions: DaySummarySession[];
}

export const daySummaries: Record<number, DaySummary> = {
  1: {
    dayId: 1,
    title: 'Empleabilidad y Futuro Profesional',
    subtitle: 'Lunes 3 de agosto',
    sessions: [
      {
        type: 'PONENCIA',
        title: 'Empleabilidad y Desafíos del Mercado',
        speaker: 'Juan Pablo Sinaragua Terrones (CEO y fundador de Laboral AI)',
        concepts: [
          {
            title: 'El inicio real de la empleabilidad',
            points: [
              'No comienza con redactar un currículum o abrir una cuenta en LinkedIn, sino con el autoconocimiento (saber quién soy y qué quiero) para trazar un plan de carrera estructurado.',
            ],
          },
          {
            title: 'Lo que buscan las empresas actualmente',
            points: [
              'Las organizaciones priorizan en un 85% la actitud y las ganas de aprender (iniciativa), seguida de la adaptabilidad a herramientas tecnológicas modernas y el desarrollo de habilidades blandas.',
              'El conocimiento puramente técnico se puede entrenar en el camino.',
            ],
          },
          {
            title: 'La visibilidad del talento joven',
            points: [
              'Actividades extracurriculares, proyectos universitarios o trabajos informales tempranos son evidencias de habilidades blandas críticas (trabajo en equipo, comunicación, resiliencia y orientación al logro) que deben colocarse en el currículum.',
            ],
          },
          {
            title: 'Filtros ATS (Applicant Tracking Systems)',
            points: [
              'Advirtió que la mayoría de los currículums pasan por filtros computarizados.',
              'Diseños complejos de Canva pueden no ser legibles para estos sistemas, por lo que se recomienda usar formatos simples en PDF o Word con tipografías tradicionales (Calibri, Arial, Verdana, etc.).',
              'El currículum debe responder a qué "salto de valor" o logros tangibles aporta el profesional, en lugar de limitarse a listar funciones operativas.',
            ],
          },
          {
            title: 'Tendencias del futuro',
            points: [
              'El mercado se está moviendo con fuerza hacia soluciones de sostenibilidad (medición de huella hídrica y de carbono, impacto social) y hacia la economía naranja/creativa (atención digital), áreas clave para especializarse.',
            ],
          },
        ],
      },
      {
        type: 'TALLER',
        title: 'Construye tu Empleabilidad (Metodología E4)',
        speaker: 'Claudia Melisa Zapana Vilca (Psicóloga y especialista en desarrollo organizacional)',
        concepts: [
          {
            title: 'La Metodología E4 de empleabilidad',
            points: [
              'Está estructurada en cuatro etapas fundamentales:',
              'Esencia (el ser): El conocerte para poder liderarte.',
              'Edificación (el propósito): Darle un sentido con propósito a tu carrera.',
              'Ejecución (la acción): Evidencias y hechos concretos.',
              'Evolución (el repetir): El aprendizaje continuo y la reinvención al ascender en el mercado.',
            ],
          },
          {
            title: 'Inteligencia Emocional y Autoestima',
            points: [
              'No se puede construir una carrera sólida sobre una identidad débil.',
              'Es vital gestionar las emociones y entender que nuestra autopercepción profesional debe basarse en hechos reales y no en el estado de ánimo o "clima emocional" del momento.',
            ],
          },
          {
            title: 'Networking Estratégico',
            points: [
              'Las oportunidades viajan a través de las personas.',
              'No consiste solo en acumular contactos, sino en construir relaciones con respeto e interés mutuo.',
              'Al interactuar con profesionales de interés, se recomendó solicitar directamente el número de WhatsApp/celular para proyectos futuros en lugar de limitarse a conectar digitalmente de forma pasiva.',
            ],
          },
          {
            title: 'Metas Habladas',
            points: [
              'Verbalizar activamente un objetivo lo transforma de un simple deseo a un compromiso con uno mismo.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Marca Personal en LinkedIn',
        speaker: 'Carla Silva Sant Esteban',
        concepts: [
          {
            title: 'Comunicar el proceso',
            points: [
              'No es necesario ser un experto absoluto para empezar a visibilizar tu marca personal en LinkedIn; se debe compartir el proceso de aprendizaje y desarrollo de los proyectos, ya que el público conecta con la autenticidad real y no con la perfección simulada.',
              'La inteligencia artificial es útil para la estructura, pero el contenido de las publicaciones debe ser auténtico.',
            ],
          },
          {
            title: 'La Fórmula "VISA" para Marca Personal',
            points: [
              'Valor (V): El diferencial o problema específico que ayudas a resolver (en lugar de definirse genéricamente como "estudiante de ingeniería industrial").',
              'Identidad (I): Tu estilo de comunicación, enfoque y storytelling personal.',
              'Señales públicas (S): La evidencia y el registro de tus proyectos en la red.',
              'Acercamiento (A): El contacto optimizado y estratégico con reclutadores e industrias de interés.',
            ],
          },
          {
            title: 'Optimización del perfil',
            points: [
              'El titular debajo del nombre es el gancho visual estratégico; debe incluir palabras clave de interés técnico, el propósito y un toque de personalidad, evitando adjetivos genéricos como "responsable" o "proactivo".',
            ],
          },
          {
            title: 'Reto de 7 Días para Posicionarse',
            points: [
              'Días 1 y 2: Actualizar foto y titular con palabras clave.',
              'Días 3 y 4: Redactar el extracto profesional (propuesta de valor).',
              'Día 5: Subir un proyecto o logro universitario.',
              'Día 6: Conectar con personas clave de tu sector.',
              'Día 7: Comentar e interactuar críticamente en publicaciones de profesionales de interés.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Competencias Profesionales para Actuar en la Industria Actual',
        speaker: 'María Laura Herrera Falcón (Psicóloga, doctora en educación y gerente de Dexit)',
        concepts: [
          {
            title: 'Los Cuatro Caminos de Desarrollo Profesional',
            points: [
              'Empleado: Trabajar bajo un horario y salario definidos buscando estabilidad.',
              'Autoempleado: Ser tu propio jefe, donde los ingresos dependen directamente del uso de tu tiempo operativo.',
              'Dueño de negocio: Liderar una empresa sabiendo delegar funciones y coordinar equipos a cargo.',
              'Inversionista: Lograr que el capital trabaje y rinda con el menor esfuerzo operativo posible.',
              'Lección: Es indispensable identificar en cuál cuadrante se tiene el perfil y la mentalidad adecuada para evitar la frustración.',
            ],
          },
          {
            title: 'Realidad del Mercado Nacional',
            points: [
              'En el Perú, la tasa de desempleo juvenil menor de 25 años es del 11.3%, el desempleo universitario es del 7% y la sobrecalificación alcanza el 50%.',
              'El 74.9% de los jóvenes trabaja de manera informal y el mercado privado está conformado por un 92% de micro y pequeñas empresas (MIPEs).',
            ],
          },
          {
            title: 'Habilidades imprescindibles',
            points: [
              'El pensamiento crítico ante las fuentes y los resultados de la IA, la resiliencia frente a los reveses académicos o laborales, y el aprendizaje continuo mínimo viable (aprovechar sabiamente el tiempo consumido en el celular).',
            ],
          },
          {
            title: 'Barreras Contextuales',
            points: [
              'Las expectativas o directrices tradicionales mal asimiladas provenientes del entorno familiar pueden bloquear o limitar el talento de los jóvenes hacia nuevos mercados.',
              'Se debe programar la mente para buscar facilitadores y ver oportunidades en lugar de centrarse únicamente en los problemas.',
            ],
          },
          {
            title: 'Planificación Financiera',
            points: [
              'El 56% de los jóvenes no planifica sus finanzas.',
              'Es fundamental ahorrar de forma constante entre el 10% y el 20% de los ingresos (incluso montos pequeños diarios) para constituir un fondo de inversión o capital semilla a mediano plazo.',
            ],
          },
        ],
      },
    ],
  },
  2: {
    dayId: 2,
    title: 'Liderazgo Estratégico y Desarrollo Profesional',
    subtitle: 'Martes 4 de agosto',
    sessions: [
      {
        type: 'PONENCIA',
        title: 'Innovación y Liderazgo con Propósito',
        speaker: 'Juan Alberto "Chacho" W.',
        block: 'Bloque Virtual (Mañana)',
        concepts: [
          {
            title: 'La esencia de la innovación',
            points: [
              'Innovar no requiere inventar todo desde cero, sino combinar el conocimiento científico y la teoría con la realidad de las personas para diseñar soluciones viables.',
              'El verdadero motor de un proyecto de innovación debe ser la alineación con un propósito personal que luche contra la indiferencia.',
            ],
          },
          {
            title: 'Caso Hopnic (Salud)',
            points: [
              'Empresa que diseña y fabrica prótesis biónicas de miembros superiores impresas en 3D en el Perú.',
              'Las prótesis funcionan con sensores mioeléctricos conectados a los músculos post-amputación que captan las señales eléctricas y permiten abrir y cerrar la mano.',
              'El equipo redujo el costo de fabricación de $10,000 a $3,000 y el tiempo de entrega a solo 9 días.',
              'Tras un análisis de mercado, descubrieron que el problema real era el acceso, ya que el 75% del país trabaja en la informalidad, carece de seguros de salud y no dispone de capital de ahorro.',
              'Para resolverlo, reconfiguraron su modelo de negocio implementando créditos directos (500 soles al mes por 24 meses) basados estrictamente en la buena voluntad y la confianza mutua.',
            ],
          },
          {
            title: 'Caso Simba (Sostenibilidad)',
            points: [
              'Startup de reciclaje guiada por la premisa \'La basura no es basura, nada sobra y nadie sobra\'.',
              'Reprocesan desperdicios orgánicos y reciclables, formalizando y capacitando a recicladores informales que crían cerdos en botaderos.',
              'Les enseñan metodologías seguras de reciclaje para evitar prácticas peligrosas (como hervir basura con combustibles contaminantes para alimentar a los animales).',
            ],
          },
          {
            title: 'Caso Escuela (Educación)',
            points: [
              'Aplicación móvil educativa construida bajo un enfoque \'low-tech\' (tecnología de baja complejidad).',
              'Está diseñada para correr con conectividad básica 2G o 3G, ya que la señal 4G/5G no está garantizada en todo el país.',
              'Brinda cursos muy básicos (inglés, nociones de contabilidad) para capacitar a trabajadores de la base de la pirámide (como ordeñadores de leche o recolectores de fruta) y potenciar sus oportunidades laborales.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Alto Rendimiento en Equipo',
        speaker: 'Lorena Patricia Acle Salías',
        block: 'Bloque Virtual (Mañana)',
        concepts: [
          {
            title: 'Grupo vs. Equipo de Alto Rendimiento',
            points: [
              'Un grupo de trabajo reúne a personas talentosas donde cada una cumple su meta individual y el resultado es la suma de las partes.',
              'Un equipo de alto rendimiento se caracteriza por tener un propósito compartido (el para qué), responsabilidad colectiva por el resultado y una confianza que permite la complementación sin chocar.',
            ],
          },
          {
            title: 'Costo del mal diseño de equipo',
            points: [
              'Provoca alta rotación del talento, \'burnout\' (cansancio y colapso por trabajar sin sentido) y la creación de \'silos\' (áreas aisladas que compiten entre sí y se echan la culpa de los fallos).',
            ],
          },
          {
            title: 'Los Tres Pilares de los Equipos de Alto Rendimiento',
            points: [
              'Formar: Asegurar un propósito común y definir con total claridad los roles antes de repartir tareas, instando a los integrantes a no asumir responsabilidades en silencio.',
              'Motivar: Sostener el compromiso en el tiempo mediante la autonomía (basada en la confianza y comunicación), el reconocimiento de aportes específicos y el feedback (retroalimentación) continuo y frecuente.',
              'Dirigir: Pasar de la tarea y el compromiso individual al \'accountability\' (responsabilidad colectiva del resultado).',
              'Se recomendó utilizar el modelo CFR (Conversaciones, Feedback y Reconocimiento) mediante reuniones breves y rituales que visibilicen avances, evitando reuniones de control que solo generan ansiedad.',
            ],
          },
          {
            title: 'Seguridad Psicológica',
            points: [
              'Es la certeza de que dentro del equipo es válido hablar, equivocarse o disentir sin temor a ser humillado o castigado.',
              'Constituye la base invisible y el predictor más fuerte del alto desempeño.',
            ],
          },
          {
            title: 'Errores comunes',
            points: [
              'Caer en la \'reunionitis\' (reuniones constantes de control disfrazado), motivar únicamente con incentivos materiales y evitar conversaciones difíciles por temor a incomodar a los miembros.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Comunicación Efectiva y Toma de Decisiones',
        speaker: 'Leslorca Ancotola (Leslie Anco Tola)',
        block: 'Bloque Virtual (Mañana)',
        concepts: [
          {
            title: 'Dinámica del Dibujo (Falla de Comunicación)',
            points: [
              'Se demostró que al dar instrucciones idénticas pero poco específicas a un grupo de personas, todos producen dibujos completamente diferentes debido a que el mensaje no se alineó correctamente y no hubo espacio para la retroalimentación.',
            ],
          },
          {
            title: 'La Comunicación Efectiva',
            points: [
              'Es el proceso mediante el cual el receptor comprende el mensaje tal como el emisor pretendía transmitirlo.',
              'Requiere de cuatro elementos fundamentales: Claridad, Escucha, Retroalimentación y No asumir.',
            ],
          },
          {
            title: 'Toma de Decisiones',
            points: [
              'Consiste en seleccionar la mejor alternativa posible evaluando la información disponible, los riesgos y las consecuencias.',
              'Está influenciada por factores como la experiencia previa, el tiempo, la presión, los costos y los riesgos percibidos.',
            ],
          },
          {
            title: 'Atajos Mentales (Sesgo del Bate y la Pelota)',
            points: [
              'Bajo situaciones de presión o rapidez, el cerebro busca soluciones inmediatas que parecen lógicas pero no son correctas (ej. un bate y una pelota cuestan S/. 1.10 y el bate cuesta S/. 1.00 más que la pelota; la respuesta intuitiva rápida suele ser S/. 0.10, pero la matemáticamente correcta es S/. 0.05).',
            ],
          },
          {
            title: 'Herramientas para decidir ante la incertidumbre',
            points: [
              'Tomarse una pausa para responder preguntas clave antes de actuar en automático: ¿Qué sé? ¿Qué información tengo? ¿Qué me falta saber? ¿Qué riesgo tiene cada opción? ¿Qué ocurre si no hago nada?',
              'Los errores son pasos necesarios e importantes para aprender y crecer.',
            ],
          },
          {
            title: 'Liderazgo y comunicación',
            points: [
              'Si un miembro del equipo calla un problema por temor a cometer un error, el líder debe reevaluar su estilo de liderazgo, erradicando el autoritarismo y abriendo canales bilaterales basados en el respeto y cuidando \'el cómo\' se dicen las cosas.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Adaptabilidad, Procesos y Tecnología en Banca',
        speaker: 'Carolina Alarcón Granda',
        block: 'Bloque Presencial (Tarde)',
        concepts: [
          {
            title: 'Migración del Core Bancario',
            points: [
              'Explicó el reto de migrar de manera virtual y 100% remota en plena pandemia (2022) al core bancario Bantotal.',
              'Se realizó en paralelo a las operaciones diarias para no detener el negocio, con la meta de soportar un volumen transaccional de más de un millón y medio de clientes (5 a 6 millones de transacciones) debido a que el core anterior ya era insuficiente.',
            ],
          },
          {
            title: 'Adopción de Metodologías Ágiles',
            points: [
              'Transicionaron desde el método de cascada (cronogramas rígidos de 7 u 8 meses) a metodologías ágiles, estructurando \'tribus\' (banca digital y soporte de asesores) que trabajan en sprints de 15 días con alcances variables y retroalimentación constante del cliente.',
              'Para requerimientos regulatorios, aplicaron modelos híbridos combinando cronogramas rígidos de Gantt con sprints ágiles.',
            ],
          },
          {
            title: 'Filosofía de Adaptabilidad',
            points: [
              '\'No puede impedirse el viento, pero pueden construirse molinos\'.',
              'Instó a transformar los obstáculos en desafíos para aplicar la creatividad.',
            ],
          },
          {
            title: 'Equilibrio de 3 Pilares',
            points: [
              'El éxito de la ingeniería con propósito se basa en conectar la tecnología con la humanidad: sin personas no hay adaptabilidad; sin procesos no hay eficiencia; y sin tecnología no hay escala y desarrollo.',
            ],
          },
          {
            title: 'Habilidades Profesionales del Futuro',
            points: [
              'El ingeniero industrial debe dominar la comunicación asertiva, la negociación para lograr presupuestos óptimos, la proactividad (llevar al jefe el problema pero acompañado de la propuesta de solución) y el pensamiento crítico para cuestionar y optimizar los procesos establecidos.',
            ],
          },
        ],
      },
      {
        type: 'BUSINESS CASE',
        title: '180 Degrees Consulting y el Caso de Lucky Airlines',
        speaker: 'Sergio, Franco, Abigail y Sebastián',
        block: 'Bloque Presencial (Tarde)',
        concepts: [
          {
            title: '¿Qué es 180 Degrees Consulting?',
            points: [
              'La consultora universitaria más grande del mundo, orientada a conectar el mejor talento estudiantil con los problemas más complejos de ONGs, empresas sociales y asociaciones civiles.',
              'Brindan soluciones en eficiencia organizativa, marketing, captación de fondos (fundraising), estrategias de crecimiento y medición de impacto social, con el respaldo y mentoría de firmas como McKinsey, Bain & Company y Strategy&.',
            ],
          },
          {
            title: 'Resolución del Caso de Negocio (Lucky Airlines - China, 2004)',
            points: [
              'Contexto del Problema: Aerolínea de bajo costo que opera con un margen operativo mínimo de 1.8% en un mercado de alto crecimiento, pero bajo una fuerte regulación del gobierno chino que controla el 70% de sus costos estructurales (combustible, arrendamiento de aeronaves, tarifas de boletos), compitiendo contra 13 nuevos actores.',
              'Metodología de Análisis (Árbol MECE): Aplicación de la técnica MECE (Mutuamente Excluyentes y Colectivamente Exhaustivos) para dividir el problema en ingresos, costos y restricciones. Se analizaron las enormes barreras para invertir en comercio electrónico en el año 2004 en China (donde la penetración de internet en Yunan era de solo 6.8%, solo 15% eran compradores virtuales y menos del 4% usaba tarjeta de crédito).',
              'Matriz de Impacto y Control:',
              'Rojo (No controlable/Podar): Costos regulados (combustible, impuestos) y el techo de flota de aviones.',
              'Amarillo (Control medio): Servicios de operación y telefonía.',
              'Verde (Control alto/Priorizar): Venta directa, reducción de costos de distribución de intermediarios (que cobraban comisiones de entre 2% y 15%), lealtad de clientes y paquetes turísticos.',
              'Decisiones Estratégicas y Recomendaciones de Consultoría:',
              'Monetizar fuera de la tarifa: Ofrecer paquetes de experiencias completas (hoteles, restaurantes) que no estén limitados por la regulación gubernamental de tarifas de vuelo.',
              'Desintermediación de la distribución: Crear canales propios para reducir la dependencia de comisiones de intermediarios.',
              'Evitar la inversión digital focalizada en zonas no digitalizadas (como Yunan) y no abrir call centers de soporte para ventas online.',
              'Crear un portal B2B y un equipo dedicado exclusivamente al e-commerce para mitigar riesgos de represalia de agentes y educar al cliente.',
              'Impacto estimado del caso: 60 millones de yuanes adicionales de rentabilidad.',
            ],
          },
        ],
      },
    ],
  },
  3: {
    dayId: 3,
    title: 'Estrategia, Logística y Analítica de Datos',
    subtitle: 'Miércoles 5 de agosto',
    sessions: [
      {
        type: 'PONENCIA',
        title: 'Mi beca no fue por suerte, fue por estrategia',
        speaker: 'Daisy Apaco (Ingeniera industrial, cofundadora de ISE y ganadora de la beca Generación del Bicentenario)',
        concepts: [
          {
            title: 'Mitos de las becas internacionales',
            points: [
              'Las notas académicas sí son un factor clave al postular a becas de posgrado.',
              'Para España, se suele requerir un promedio mínimo de 7 sobre 10 para tentar una postulación.',
            ],
          },
          {
            title: 'Ubicación estratégica y el idioma',
            points: [
              'Se desmitifica que dominar el inglés sea obligatorio para ir al extranjero.',
              'España cuenta con 10 universidades en el top 400 mundial con educación de alta calidad en español que son elegibles para becas del gobierno peruano.',
            ],
          },
          {
            title: 'Choque cultural y duelo migratorio',
            points: [
              'Estudiar en el extranjero implica superar el "duelo migratorio": un proceso de distanciamiento y adaptación emocional apoyado incluso por psicólogos.',
              'El duelo se agrava por el cambio de zonas horarias (como las 7 horas de diferencia entre Perú y España), que dificulta la comunicación continua con el entorno de origen.',
            ],
          },
          {
            title: 'Ventaja para ingenieros industriales en Europa',
            points: [
              'En España, la ingeniería industrial es una carrera regulada que se puede ejercer directamente sin necesidad de homologación previa.',
              'La única limitación es para firmar proyectos de manera autónoma.',
            ],
          },
          {
            title: 'La estrategia de los tres planes',
            points: [
              'El éxito de una postulación radica en planificar a mediano y largo plazo.',
              'Plan A: beca de gobierno (como Generación del Bicentenario).',
              'Plan B: becas de fundaciones o escuelas de negocios (como Ceste).',
              'Plan C: recursos propios, para garantizar la salida al extranjero.',
            ],
          },
          {
            title: 'La metáfora de "La Vaca" (de Camilo Cruz)',
            points: [
              'La vaca representa la flojera y la zona de confort que nos limitan a sobrevivir con lo mínimo.',
              '"Matar la vaca" es el acto indispensable de salir de la zona de confort para obligarnos a crecer y reinventarnos.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Distribución comercial y estrategias logísticas para conquistar el mercado',
        speaker: 'Víctor Manuel Maldonado Corimaya (Gerente Administrativo y Comercial de Grupo Sander)',
        concepts: [
          {
            title: 'Visión integral de la logística',
            points: [
              'La logística moderna no se limita a mover productos físicos.',
              'Su gestión impacta directamente en las ventas, los costos, el manejo de inventario y la rentabilidad final de la empresa.',
            ],
          },
          {
            title: 'La cadena de complejidad en las compras',
            points: [
              'El abastecimiento escala desde una transacción local simple en efectivo hasta compras internacionales (como importaciones de China).',
              'Las compras internacionales requieren cartas de crédito bancarias, fletes marítimos, coordinación con agentes de carga, aduanas y almacenes aduaneros.',
            ],
          },
          {
            title: 'La planificación estratégica',
            points: [
              'El error corporativo más común y destructivo es la falta de planificación.',
              'Se requiere dominar el análisis FODA (analizando factores internos "fi" y externos "fe").',
              'Evaluar financieramente los proyectos con herramientas como el VAN, TIR, flujo de caja y estados proyectados para trazar metas logísticas y comerciales sólidas.',
            ],
          },
          {
            title: 'Proceso S&OP (Sales and Operations Planning)',
            points: [
              'Cadena coordinada que une la investigación de mercado, la planificación de la demanda (Demand Planner), la planeación de la producción y la planeación de abastecimiento de insumos y distribución.',
            ],
          },
          {
            title: 'Gestión de Inventario (El corazón del negocio)',
            points: [
              'Sobrestock (Exceso): Incrementa costos de almacenamiento (incluso si el local es propio, se debe calcular el costo de oportunidad o alquiler), inmoviliza capital de trabajo y eleva el riesgo de obsolescencia y devaluación del producto.',
              'Understock (Poco stock): Causa roturas de stock, pérdida de ventas irrecuperables en el tiempo e insatisfacción de clientes, además de provocar paradas críticas en las líneas de producción que generan altos costos de mano de obra ociosa.',
            ],
          },
          {
            title: 'Herramientas para el logístico actual',
            points: [
              'Es vital que el ingeniero domine herramientas de analítica y automatización como Power BI (Power Query, Power Pivot), Excel avanzado y herramientas de Inteligencia Artificial para el desarrollo.',
              'Siempre aplicando el pensamiento crítico y la ética.',
            ],
          },
          {
            title: 'La fórmula del éxito',
            points: [
              'Sincronizar un producto correcto, stock correcto, canal correcto y tiempo correcto para lograr la máxima satisfacción del cliente.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Pronóstico de la demanda y analítica de datos aplicada a los negocios',
        speaker: 'Amat Daniel Jusén Jiménez (Ingeniero industrial especializado en Ciencia de Datos y Machine Learning)',
        concepts: [
          {
            title: 'Utilidad del pronóstico',
            points: [
              'Es el primer paso o el "input" indispensable para anticiparse a los escenarios.',
              'Permite justificar cualquier propuesta de cambio y optimizar la cadena de suministro.',
            ],
          },
          {
            title: 'Series de Tiempo (dependencia temporal de la fecha)',
            points: [
              'Promedio Móvil: El más sencillo, promedia periodos históricos anteriores.',
              'Suavizamiento Exponencial: Incorpora tendencias y estacionalidades en los datos.',
              'Modelo Logístico: Ideal para productos nuevos (como el lanzamiento de un iPhone) que sufren un crecimiento acelerado y luego se saturan al llegar a un punto de inflexión.',
              'Holt-Winter: Calibra nivel, tendencia y estacionalidad aplicando coeficientes (alfa, beta, gama) calculados para minimizar el error.',
              'ARIMA / ARMA: Analiza la autocorrelación o dependencia de datos históricos de forma flexible; es el algoritmo integrado por defecto en softwares de analítica como Power BI.',
            ],
          },
          {
            title: 'Modelos de Regresión (múltiples variables independientes)',
            points: [
              'Regresión Lineal Múltiple: Para relaciones lineales simples.',
              'Árboles de Decisión: Clasifica datos en grupos según condiciones, ideal para relaciones no lineales.',
              'Redes Neuronales / Deep Learning: Modelos sumamente flexibles y avanzados, diseñados para captar patrones donde hay mucho ruido o volatilidad en la data; se pueden optimizar con Descenso de Gradiente de forma iterativa.',
              'K-Means / Clustering: Agrupamiento de variables por proximidad.',
              'Teorema de Bayes: Pronósticos basados en probabilidades condicionadas.',
              'Distribuciones Aleatorias (simulaciones): Distribuciones como la Normal (Campana de Gauss), Exponencial o de Poisson, utilizadas como variables de entrada (ej. flujo de llegada de clientes o camiones).',
            ],
          },
          {
            title: 'Ajuste y Entrenamiento en Machine Learning',
            points: [
              'Underfitting: Modelo mal entrenado, con alto error en el entrenamiento y testeo.',
              'Overfitting: El modelo memoriza la data de entrenamiento (error casi cero), pero falla ante datos reales porque no tolera la incertidumbre.',
              'Optimal Fitting: El balance ideal, donde el modelo aprende las tendencias generales y responde bien ante datos nuevos.',
            ],
          },
          {
            title: 'Caso de Aplicación (Última Milla)',
            points: [
              'Para diseñar un sistema de ruteo eficiente se debe estructurar un flujo secuencial: analizar el comportamiento de la demanda.',
              'Considerar las características de los paquetes (peso, volumen, fragilidad, cadena de frío).',
              'Definir los tipos de vehículos y sus costos (por distancia o uso).',
              'Respetar las condiciones de servicio al cliente (coordenadas, ventanas horarias de entrega).',
            ],
          },
          {
            title: 'El peligro del inventario (¿Tener demasiado o no tener suficiente?)',
            points: [
              'Depende del tipo de producto.',
              'Los productos con alta estacionalidad (como helados) requieren sobrestock previo para la temporada alta.',
              'Para productos de Clase A (de altísimo valor), no tener suficientes mitiga los riesgos de pérdidas financieras masivas por daños, devaluación u obsolescencia.',
            ],
          },
          {
            title: 'Frase de Cierre',
            points: [
              '"Sin datos, solo eres otra persona con una opinión".',
            ],
          },
        ],
      },
    ],
  },
  4: {
    dayId: 4,
    title: 'Innovación, Tecnología y Logística Inteligente',
    subtitle: 'Jueves 6 de agosto',
    sessions: [
      {
        type: 'PONENCIA',
        title: 'Scrumban para proyectos de innovación',
        speaker: 'Luz Alicia Acevedo Ávila (PMO manager en el sector bancario)',
        concepts: [
          {
            title: 'Origen de la innovación',
            points: [
              'La innovación no nace de una solución prefabricada, sino de la identificación oportuna de un problema o punto de dolor del usuario.',
              'Utilizando la metodología Lean Startup, se formula una hipótesis, se diseña un experimento mínimo viable, se mide y se itera en un ciclo continuo de aprendizaje.',
            ],
          },
          {
            title: 'Scrum como gestión de incertidumbre',
            points: [
              'Convierte la incertidumbre en iteraciones a través de Sprints (de 1 a 4 semanas) orientados a construir un incremento de producto.',
              'Se basa en tres pilares: Transparencia (visibilidad de la información), Inspección (revisión constante con evidencia) y Adaptación (ajustar el rumbo cuando la realidad cambia).',
            ],
          },
          {
            title: 'Kanban como flujo continuo',
            points: [
              'Busca organizar visualmente el trabajo mediante columnas (backlog, ready, doing, review, testing, done).',
              'Utiliza el sistema pull mediante el límite de WIP (Work in Progress), restringiendo la cantidad máxima de tareas permitidas en cada estado para evitar la sobrecarga y los cuellos de botella.',
            ],
          },
          {
            title: 'La fusión "Scrumban"',
            points: [
              'Integra la estructura de roles, eventos de planificación y retrospectivas de Scrum con la flexibilidad visual, límites de WIP y métricas de flujo de Kanban.',
            ],
          },
          {
            title: 'Priorización estratégica',
            points: [
              'Las tareas en el backlog se deben priorizar bajo tres criterios: Valor (impacto real en el negocio), Riesgo (incertidumbre) y Esfuerzo (el experimento más pequeño y reversible para aprender).',
            ],
          },
          {
            title: 'Uso de IA en el diseño de proyectos',
            points: [
              'Presentó Lovable, una herramienta de inteligencia artificial que permite diseñar prototipos web funcionales en minutos a partir de prompts estructurados (roles, contexto, acción y tono).',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Modelos de negocio innovadores',
        speaker: 'Gonzalo Sánchez Lorenzo (CEO de COD de digital)',
        concepts: [
          {
            title: 'Crear, capturar y escalar valor',
            points: [
              'Las organizaciones modernas ya no deben competir únicamente por precio o eficiencia (lo cual es insostenible a largo plazo), sino por su capacidad de rediseñar su modelo de negocio.',
            ],
          },
          {
            title: 'Evolución del modelo de negocio',
            points: [
              'Usó el caso de Kodak e Instagram para ejemplificar que la tecnología es solo un habilitador: Instagram no inventó la fotografía, sino que capturó la esencia de la experiencia y monetizó la interacción digital.',
              'La transformación digital implica cambiar la arquitectura de cómo se genera valor, no solo comprar software.',
            ],
          },
          {
            title: 'La arquitectura del Canvas (9 bloques)',
            points: [
              'Explicó cómo encajan los bloques de construcción (Clientes, Propuesta de Valor, Canales, Relación, Ingresos, Recursos, Actividades, Socios y Costos) utilizando a Uber como modelo dinámico.',
              'Mostró cómo Uber tiene dos segmentos de clientes complementarios (pasajeros y conductores) y cómo su recurso clave es el software.',
            ],
          },
          {
            title: 'Del producto al resultado/experiencia',
            points: [
              'Las empresas ya no venden el activo físico, sino el resultado gestionado (ej. Michelin cobrando por kilómetros recorridos, Rolls-Royce por horas de vuelo de motores, o Philips por iluminación como servicio).',
            ],
          },
          {
            title: 'Monetización de datos y activos intangibles',
            points: [
              'En la economía de la IA, el activo más valioso de las empresas son los datos.',
              'Empresas como Google, Amazon o Tesla convierten el comportamiento de los usuarios en valor económico y algoritmos predictivos.',
            ],
          },
          {
            title: 'Modelos de ingresos recurrentes',
            points: [
              'Transicionar de ventas únicas a suscripciones recurrentes, modelos freemium o SaaS (ej. Netflix, Microsoft, Adobe), lo cual brinda ingresos predecibles y alta fidelización.',
            ],
          },
          {
            title: 'Ecosistemas de plataformas',
            points: [
              'Conectar a productores, consumidores y desarrolladores externos para retroalimentar el negocio (ej. Apple con App Store, Amazon, MercadoLibre, Airbnb).',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Inteligencia artificial aplicada a la seguridad y salud en el trabajo',
        speaker: 'Raimundo Carranza Noriega (Gerente en Carranza Arcay y docente principal)',
        concepts: [
          {
            title: 'Prevención de accidentes mediante visión por computadora',
            points: [
              'Presentó Harkai (Hark), un sistema de supervisión en tiempo real desarrollado por ingenieros peruanos que procesa imágenes de cámaras de seguridad para detectar actos y condiciones inseguras de manera preventiva.',
            ],
          },
          {
            title: 'Funcionamiento técnico',
            points: [
              'El sistema captura frames de video (cámaras analógicas o digitales), recorta el área de interés y procesa los datos mediante algoritmos de detección de imágenes (como YOLO o Detect) y redes neuronales convolucionales.',
              'Analiza la posición tridimensional, colores y gestos para enviar alertas sonoras o lumínicas in situ en milisegundos.',
            ],
          },
          {
            title: 'Casos prácticos de aplicación real',
            points: [
              'Atrapamiento de manos: En una fábrica de chocolates, el sistema traza líneas musculoesqueléticas y detiene la faja o emite alertas si el operario acerca la mano al molino de cacao.',
              'Zonas restringidas: Alertas visuales y sonoras en fajas transportadoras si un trabajador transita por debajo.',
              'Inocuidad alimentaria: En cocinas mineras de gran escala, detecta si el personal usa guantes y cofias.',
              'Uso de celulares: Identificación mediante visión artificial de operarios que manipulan celulares en áreas industriales peligrosas.',
              'Seguridad vial/transporte: Reconocimiento facial en cabinas de camiones para alertar fatiga, microsueño o el no uso del cinturón de seguridad.',
              'Mantenimiento predictivo: Detección de viruta acumulada en máquinas trefiladoras para anticipar paros de producción.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'Gestión logística y supply chain inteligente',
        speaker: 'Óscar Sosa (Gerente de desarrollo de negocios en BCF y Aldea Logística)',
        concepts: [
          {
            title: 'Impacto de la logística en los estados financieros',
            points: [
              'Detalló cómo la logística puede optimizar la última línea de utilidades (bottom line) mediante eficiencias de costos, o expandir la primera línea de ingresos (top line) mejorando el servicio al cliente.',
            ],
          },
          {
            title: 'Caso de Optimización del Bottom Line (Minería)',
            points: [
              'Enfoque de Pareto: Identificó que el 70% del costo de fletes se concentraba en camiones de baranda (sacos/cajas) y cisternas (líquidos a granel).',
              'Trabajo en campo (Gemba): Realizó rutas reales y descubrió que muchas restricciones de puentes, pendientes o de recepción en minas eran solo mitos o "leyendas urbanas".',
              'Acciones: Reconfiguraron y ampliaron la capacidad de carga del 70% de la flota.',
              'Encontraron que el llenado de cisternas de emulsión (producto grumoso) generaba burbujas de aire; al cambiar el ángulo de llenado (como servir una cerveza), elevaron la utilización de los camiones cisterna del 91% al 98.8%.',
              'Rediseñaron el tamaño de los pedidos alineándolos a la capacidad del camión.',
              'Resultado: Reducción de más del 20% en los costos de transporte.',
            ],
          },
          {
            title: 'Caso de Expansión del Top Line (Logística Omnicanal B2C)',
            points: [
              'El reto: Competir como el tercer actor del retail contra rivales que cuadriplicaban sus ventas en e-commerce.',
              'Estrategia "Blick Creek": Implementar un plan agresivo de capacidades organizacionales basado en agilidad, decisiones orientadas a los datos, adaptabilidad y pensamiento comercial.',
              'Acciones: Crearon una red de Click & Collect aliándose con puntos externos (como Tambo), pasando de 20 a más de 600 puntos de recogida en todo el Perú.',
              'Habilitaron 10 tiendas físicas para despachar pedidos locales (ship-from-store) y abrieron 8 almacenes de tránsito.',
              'Automatizaron el almacén con sorters y robots de empaquetado para e-commerce.',
              'Resultado: Redujeron los tiempos de entrega promedio de 72 horas a 90 minutos (o Same Day).',
              'El Click & Collect llegó a representar el 42% de los pedidos de e-commerce.',
            ],
          },
        ],
      },
      {
        type: 'PONENCIA',
        title: 'El ADN del profesional innovador',
        speaker: 'Alessandra Arbaisa (Líder de beneficios en Mondelēz Perú)',
        concepts: [
          {
            title: 'La democratización de la innovación',
            points: [
              'Desmitificó que la innovación provenga únicamente de consultoras externas, del área de marketing o del CEO.',
              'Cualquier colaborador (incluso practicantes) puede innovar optimizando su propio trabajo.',
            ],
          },
          {
            title: 'Innovación incremental',
            points: [
              'Innovar no requiere inventar un producto revolucionario.',
              'Ahorrarle 30 minutos diarios a un equipo mediante flujos optimizados genera un alto impacto en la organización.',
            ],
          },
          {
            title: 'Diferencia entre Innovación y Mejora Continua',
            points: [
              'La innovación resuelve un problema eliminando un punto de incomodidad del usuario.',
              'La mejora continua analiza la solución ya establecida para refinarla y evitar que quede obsoleta frente al mercado (evitando el declive que sufrió Kodak).',
            ],
          },
          {
            title: 'Los tres pilares del ADN innovador',
            points: [
              'Curiosidad: Cuestionarse constantemente a uno mismo ("¿por qué se hace así?", "¿qué tarea me consume más tiempo?") y a los clientes internos de otras áreas para identificar ineficiencias.',
              'Comunicación: Traducir los hallazgos en datos tangibles antes de presentarlos a los líderes corporativos ("dato mata relato").',
              'Accountability: Adueñarse del proceso, buscar la causa raíz de los fallos (con metodologías de análisis de causa raíz como los 5 Porqués) en lugar de limitarse a parchar el error del momento.',
            ],
          },
          {
            title: 'La IA como copiloto',
            points: [
              'Utilizar prompts inteligentes basados en el contexto, rol, acción, formato y tono para que la IA realice análisis de bases de datos complejos en minutos.',
            ],
          },
        ],
      },
    ],
  },
};

export const getDaySummary = (dayId: number): DaySummary | null =>
  daySummaries[dayId] ?? null;
