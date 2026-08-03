import React from 'react';
import { motion } from 'framer-motion';
import { Award, User, Target, Crown, Zap, Sparkles } from 'lucide-react';
import type { UserProgress } from '../../utils/gamificationStore';
import { getLevelForXp, getNextLevel, getXpProgress } from '../../data/levelDefinitions';

interface UserData {
  name: string;
  ticketType: string;
  level: number;
}

interface DashboardProps {
  user: UserData;
  progress: UserProgress | null;
  onOpenProfile: () => void;
  onOpenKnowledgeTree: () => void;
  onOpenPassport: () => void;
}

const ticketGradients: Record<string, string> = {
  ESTANDAR: 'from-gray-500 to-gray-600',
  VIP: 'from-amber-400 to-orange-500',
  PREMIUM: 'from-primary to-secondary',
};

export const Dashboard: React.FC<DashboardProps> = ({ user, progress, onOpenProfile, onOpenKnowledgeTree, onOpenPassport }) => {
  const isStandard = user.ticketType === 'ESTANDAR';
  const xp = progress?.xp ?? 0;
  const levelDef = getLevelForXp(xp);
  const nextLevel = getNextLevel(levelDef.level);
  const xpPercent = getXpProgress(xp);
  const badgeCount = progress?.earnedBadges.length ?? 0;
  const ticketGrad = ticketGradients[user.ticketType] ?? ticketGradients.ESTANDAR;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white/70 backdrop-blur-2xl sticky top-0 z-30 border-b border-gray-100/60 shadow-[0_4px_40px_rgba(42,1,102,0.04)]"
    >
      <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            {/* Animated avatar with ring */}
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className={`absolute -inset-1 rounded-2xl bg-gradient-to-tr ${ticketGrad} opacity-30 blur-sm`}
              />
              <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-tr ${ticketGrad} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {user.name.charAt(0)}
              </div>
              {/* Level indicator badge */}
              {!isStandard && (
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <span className="text-[9px] font-black text-primary">{levelDef.level}</span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-lg font-bold text-deep tracking-tight">
                Bienvenido, <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep to-primary">{user.name}</span>
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                <Crown size={13} className="text-primary" />
                <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${ticketGrad} text-xs uppercase tracking-wider`}>
                  {user.ticketType} PASS
                </span>
                <span className="text-gray-200">•</span>
                <span className="font-medium text-xs">{isStandard ? 'Acceso informativo' : levelDef.title}</span>
              </div>

              {/* XP progress bar — enhanced */}
              {!isStandard && (
              <div className="flex items-center gap-2 mt-2">
                <Zap size={12} className="text-amber-500 flex-shrink-0 fill-amber-500" />
                <div className="w-28 sm:w-36 h-2.5 bg-gray-100 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 rounded-full relative"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                  </motion.div>
                </div>
                <span className="text-[11px] font-bold text-gray-400 tabular-nums whitespace-nowrap">
                  {xp}{nextLevel ? ` / ${nextLevel.xpRequired}` : ''} XP
                </span>
                {badgeCount > 0 && (
                  <>
                    <span className="text-gray-200">•</span>
                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                      <Sparkles size={10} className="fill-amber-400" /> {badgeCount}
                    </span>
                  </>
                )}
              </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-center sm:justify-end overflow-visible py-1"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all text-[13px] font-semibold border border-gray-100 hover:border-primary/20 text-deep"
            >
              <User size={14} className="text-primary" /> Perfil
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenPassport}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all text-[13px] font-semibold border border-gray-100 hover:border-primary/20 text-deep"
            >
              <Target size={14} className="text-primary" /> Premios
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenKnowledgeTree}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 text-[13px] font-bold ${user.ticketType === 'ESTANDAR' ? 'bg-gray-400 text-white shadow-sm' : 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_6px_16px_-4px_rgba(132,12,215,0.45)] hover:shadow-[0_10px_20px_-4px_rgba(132,12,215,0.6)]'}`}
            >
              <Award size={14} /> Mis habilidades
            </motion.button>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
};
