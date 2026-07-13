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
  STANDARD: 'from-gray-500 to-gray-600',
  VIP: 'from-amber-400 to-orange-500',
  PREMIUM: 'from-primary to-secondary',
};

export const Dashboard: React.FC<DashboardProps> = ({ user, progress, onOpenProfile, onOpenKnowledgeTree, onOpenPassport }) => {
  const xp = progress?.xp ?? 0;
  const levelDef = getLevelForXp(xp);
  const nextLevel = getNextLevel(levelDef.level);
  const xpPercent = getXpProgress(xp);
  const badgeCount = progress?.earnedBadges.length ?? 0;
  const ticketGrad = ticketGradients[user.ticketType] ?? ticketGradients.STANDARD;

  return (
    <div className="w-full bg-white/70 backdrop-blur-2xl sticky top-0 z-30 border-b border-gray-100/60 shadow-[0_4px_40px_rgba(42,1,102,0.04)]">
      <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
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
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                <span className="text-[9px] font-black text-primary">{levelDef.level}</span>
              </div>
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
                <span className="font-medium text-xs">{levelDef.title}</span>
              </div>

              {/* XP progress bar — enhanced */}
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
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenProfile}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm font-semibold border border-gray-100 hover:border-primary/20 text-deep"
            >
              <User size={15} className="text-primary" /> Perfil
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenPassport}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm font-semibold border border-gray-100 hover:border-primary/20 text-deep"
            >
              <Target size={15} className="text-primary" /> Premios
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenKnowledgeTree}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 text-sm font-bold ${user.ticketType === 'STANDARD' ? 'bg-gray-400 text-white shadow-sm' : 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_8px_20px_-6px_rgba(132,12,215,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(132,12,215,0.7)]'}`}
            >
              <Award size={15} /> Mis habilidades
            </motion.button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
