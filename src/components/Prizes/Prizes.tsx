import React, { useState } from 'react';
import { Modal } from '../UI/Modal';
import { Crown, Gift, Shuffle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPrizeLibrary } from '../../data/prizeLibrary';
import { PioneroBadgeCelebration } from '../UI/PioneroBadgeCelebration';
import { playClickSound } from '../../utils/sounds';

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

const PIONERO_STORAGE_KEY = 'ceiise-pionero-claimed';

export const Prizes: React.FC<PrizesProps> = ({ isOpen, onClose, user }) => {
  const userRank = TICKET_RANK[user.ticketType] ?? 1;
  const [pioneroClaimed, setPioneroClaimed] = useState(() => {
    try { return localStorage.getItem(`${PIONERO_STORAGE_KEY}-${user.documentId}`) === 'true'; } catch { return false; }
  });
  const [showCelebration, setShowCelebration] = useState(false);

  const prizes = getPrizeLibrary().map((prize) => ({
    ...prize,
    accessible: userRank >= TICKET_RANK[prize.eligibility],
  }));

  const handleClaimPionero = () => {
    playClickSound();
    setShowCelebration(true);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    setPioneroClaimed(true);
    try { localStorage.setItem(`${PIONERO_STORAGE_KEY}-${user.documentId}`, 'true'); } catch { /* skip */ }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Premios CEIISE 2026">
        {/* Pionero CEIISE Badge — Available to everyone */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-2xl border-2 p-5 ${
              pioneroClaimed
                ? 'border-amber-300/50 bg-gradient-to-br from-amber-50 to-orange-50'
                : 'border-amber-400 bg-gradient-to-br from-amber-50 via-white to-orange-50'
            }`}
          >
            {/* Decorative glow */}
            {!pioneroClaimed && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-300/20 to-transparent rounded-bl-full pointer-events-none" />
            )}

            <div className="flex items-center gap-4 relative z-10">
              <motion.div
                animate={!pioneroClaimed ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-400/30"
              >
                <span className="text-3xl">🏅</span>
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white uppercase tracking-[0.15em] shadow-sm">
                    Exclusivo
                  </span>
                  <Sparkles size={14} className="text-amber-500" />
                </div>
                <div className="font-extrabold text-deep text-lg tracking-tight leading-tight">
                  Insignia "Pionero CEIISE"
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-snug">
                  Insignia exclusiva para todos los participantes del CEIISE 2026. ¡Reclámala y úsala con orgullo!
                </div>
              </div>

              {pioneroClaimed ? (
                <div className="flex-shrink-0 flex items-center gap-1.5 bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full border border-green-200 font-bold">
                  ✓ Reclamada
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleClaimPionero}
                  className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 transition-shadow uppercase tracking-wider"
                >
                  Reclamar
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

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
          {prizes.map((prize, idx) => {
            const isRaffle = prize.status === 'raffle';
            const accessible = prize.accessible;

            return (
              <motion.div
                key={prize.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`relative overflow-hidden flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  accessible
                    ? 'bg-white border-gray-200 hover:border-primary/30 hover:shadow-md'
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
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 italic">
          * Lista tentativa sujeta a cambios. Los premios finales serán anunciados durante el evento.
        </p>
      </Modal>

      {/* Pionero Badge full-screen celebration */}
      <PioneroBadgeCelebration
        isOpen={showCelebration}
        onClose={handleCelebrationClose}
        userName={user.name}
      />
    </>
  );
};
