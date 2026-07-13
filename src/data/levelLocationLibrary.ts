import heroImage from '../assets/AUDI_ADMI.png';

export interface LevelLocationDetail {
  levelId: number;
  imageSrc: string;
  placeName: string;
  locationDescription: string;
  address: string;
}

export const levelLocationLibrary: Record<number, LevelLocationDetail> = {
  1: {
    levelId: 1,
    imageSrc: heroImage,
    placeName: 'Auditorio Principal CEIISE',
    locationDescription: 'Inauguración y bienvenida en el auditorio central del congreso.',
    address: 'Av. Principal 123, Centro de Convenciones'
  },
  2: {
    levelId: 2,
    imageSrc: heroImage,
    placeName: 'Pabellón de Innovación',
    locationDescription: 'Sesiones de innovación tecnológica en el pabellón especializado.',
    address: 'Carrera 45 # 20-10, Zona Expo'
  },
  3: {
    levelId: 3,
    imageSrc: heroImage,
    placeName: 'Centro Logístico CEIISE',
    locationDescription: 'Actividades de logística inteligente y recorridos técnicos.',
    address: 'Calle 12 # 8-50, Parque Industrial'
  },
  4: {
    levelId: 4,
    imageSrc: heroImage,
    placeName: 'Zona de Visitas Técnicas',
    locationDescription: 'Visitas técnicas y feria de proyectos en el área exterior.',
    address: 'Ruta de la Innovación, Sector Norte'
  },
  5: {
    levelId: 5,
    imageSrc: heroImage,
    placeName: 'Gran Salón de Clausura',
    locationDescription: 'Ceremonia de clausura y despedida en el salón principal.',
    address: 'Av. del Evento 5, Plaza Central'
  }
};

export const getLevelLocation = (levelId: number) => {
  return levelLocationLibrary[levelId] ?? {
    levelId,
    imageSrc: heroImage,
    placeName: 'Ubicación por confirmar',
    locationDescription: 'Los detalles del lugar se actualizarán pronto.',
    address: 'Dirección pendiente'
  };
};
