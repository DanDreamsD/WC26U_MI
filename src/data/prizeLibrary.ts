export interface PrizeItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  eligibility: string;
  status: 'available' | 'raffle';
}

export const prizeLibrary: PrizeItem[] = [
  {
    id: 'p1',
    category: 'Premio Especial',
    title: 'Insignia de regalo',
    description: 'Insignia digital conmemorativa por ser parte del congreso.',
    icon: '🏅',
    eligibility: 'VIP',
    status: 'available',
  },
  {
    id: 'p2',
    category: 'Premio Mayor',
    title: 'Kit CEIISE 2026',
    description: 'Kit de bienvenida al congreso.',
    icon: '🎒',
    eligibility: 'ESTANDAR',
    status: 'available',
  },
  {
    id: 'p3',
    category: 'Premio General',
    title: 'Certificado de participación oficial',
    description: 'Certificado oficial de participación en el CEIISE 2026.',
    icon: '📜',
    eligibility: 'ESTANDAR',
    status: 'available',
  },
];

export const getPrizeLibrary = () => prizeLibrary;
