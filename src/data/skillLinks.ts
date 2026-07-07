export interface SkillResourceItem {
  id: string;
  description: string;
  recording: {
    label: string;
    url: string;
    duration: string;
    quality: string;
  };
  presentation: {
    label: string;
    url: string;
    format: string;
  };
}

export const skillResources: Record<string, SkillResourceItem> = {
  n1: {
    id: 'n1',
    description: 'Competencia desarrollada para comunicar ideas con claridad, empatía y propósito en entornos profesionales.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '45 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n2: {
    id: 'n2',
    description: 'Herramientas y dinámicas para fortalecer la colaboración, la confianza y la ejecución conjunta.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '38 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n3: {
    id: 'n3',
    description: 'Estrategias para influir, cerrar acuerdos y transformar desacuerdos en oportunidades de valor.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '41 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n4: {
    id: 'n4',
    description: 'Aplicación de tecnologías disruptivas para optimizar procesos, datos y toma de decisiones.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '50 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n5: {
    id: 'n5',
    description: 'Exploración práctica de la inteligencia artificial para resolver problemas concretos y crear valor.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '47 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n6: {
    id: 'n6',
    description: 'Mapeo y ejecución de la transformación digital para impulsar productividad y competitividad.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '44 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n7: {
    id: 'n7',
    description: 'Metodologías para eliminar desperdicios, mejorar flujo y fortalecer la eficiencia operativa.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '42 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n8: {
    id: 'n8',
    description: 'Diseño de cadenas de suministro más ágiles, visibles y resilientes.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '46 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
  n9: {
    id: 'n9',
    description: 'Automatización y control inteligente para incrementar precisión, velocidad y escalabilidad.',
    recording: {
      label: 'Grabación de Ponencia',
      url: 'https://ceiise.org',
      duration: '48 min',
      quality: '1080p',
    },
    presentation: {
      label: 'Presentación PDF',
      url: 'https://ceiise.org',
      format: 'PDF',
    },
  },
};

export const getSkillResource = (nodeId: string): SkillResourceItem => {
  return skillResources[nodeId] ?? skillResources.n1;
};
