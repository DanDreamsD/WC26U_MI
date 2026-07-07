import React from 'react';
import { Modal } from '../UI/Modal';
import { Crown, Gift, Shuffle } from 'lucide-react';
import { getPrizeLibrary } from '../../data/prizeLibrary';

interface PrizesProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const TICKET_RANK: Record<string, number> = {
  STANDARD: 1,
  VIP: 2,
  PREMIUM: 3,
};

const categoryColors: Record<string, string> = {
  'Premio Mayor': 'bg-amber-50 border-amber-200 text-amber-700',
  'Premio VIP': 'bg-purple-50 border-purple-200 text-purple-700',
  'Premio General': 'bg-green-50 border-green-200 text-green-700',
  'Premio Sorteo': 'bg-sky-50 border-sky-200 text-sky-700',
};

export const Prizes: React.FC<PrizesProps> = ({ isOpen, onClose, user }) => {
  const userRank = TICKET_RANK[user.ticketType] ?? 1;

  const prizes = getPrizeLibrary().map((prize) => ({
    ...prize,
    accessible: userRank >= TICKET_RANK[prize.eligibility],
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Premios CEIISE 2026">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl border border-primary/10 mb-6 flex items-start gap-3">
        <Gift size={22} className="text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-primary mb-1">Lista provisional de premios</h4>
          <p className="text-sm text-gray-600">
            Los premios definitivos serán confirmados próximamente. Esta es una lista tentativa de lo que podrías ganar en el CEIISE 2026.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {prizes.map((prize) => {
          const isRaffle = prize.status === 'raffle';
          const accessible = prize.accessible;

          return (
            <div
              key={prize.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                accessible
                  ? 'bg-white border-gray-200 hover:border-primary/30 hover:shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-3xl flex-shrink-0">{prize.icon}</div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${categoryColors[prize.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    {prize.category}
                  </span>
                  {isRaffle && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-600 border border-sky-200 uppercase tracking-wider">
                      <Shuffle size={10} /> Sorteo
                    </span>
                  )}
                </div>
                <div className={`font-bold text-sm ${accessible ? 'text-deep' : 'text-gray-500'}`}>
                  {prize.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 leading-snug">{prize.description}</div>
              </div>

              {!accessible && (
                <div className="flex-shrink-0 flex items-center gap-1 bg-amber-50 text-amber-600 text-xs px-2 py-1 rounded-lg border border-amber-200 font-semibold">
                  <Crown size={12} />
                  {prize.eligibility}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-gray-400 italic">
        * Lista tentativa sujeta a cambios. Los premios finales serán anunciados durante el evento.
      </p>
    </Modal>
  );
};
