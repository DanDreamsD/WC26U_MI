import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Calendar } from 'lucide-react';
import { formatLevelDate, getLevelStatus } from '../../utils/levelStatus';

interface JourneyNodeProps {
  level: any;
  isLast: boolean;
  onClick: (level: any) => void;
}

export const JourneyNode: React.FC<JourneyNodeProps> = ({ level, isLast, onClick }) => {
  const computedStatus = getLevelStatus(level.date);
  const isCompleted = computedStatus === 'completed';
  const isAvailable = computedStatus === 'available';
  const isLocked = computedStatus === 'locked';

  return (
    <div className="flex flex-col items-start w-full max-w-sm mx-auto group cursor-pointer" onClick={() => onClick(level)}>
      <div className="flex items-center gap-6 w-full">
        {/* Node */}
        <div className="relative flex flex-col items-center">
          <motion.div 
            whileHover={isLocked ? {} : { scale: 1.05 }}
            whileTap={isLocked ? {} : { scale: 0.95 }}
            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
              isCompleted ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-primary/40' : 
              isAvailable ? 'bg-white border-[3px] border-primary text-primary shadow-primary/20 shadow-[0_0_30px_rgba(132,12,215,0.2)]' : 
              'bg-gray-50/80 backdrop-blur-sm text-gray-300 border border-gray-200 shadow-none'
            }`}
          >
            {isCompleted && <Check size={32} />}
            {isAvailable && <span className="text-2xl font-bold">{level.day}</span>}
            {isLocked && <Lock size={28} />}
            
            {isAvailable && (
              <div className="absolute inset-[-4px] rounded-full border-2 border-primary/40 animate-ping" style={{ animationDuration: '3s' }} />
            )}
          </motion.div>
        </div>

        {/* Info */}
        <div className={`flex-1 py-4 px-6 rounded-2xl transition-all duration-300 ${isLocked ? 'opacity-60 grayscale' : 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100/50 group-hover:shadow-[0_8px_30px_rgba(132,12,215,0.08)] group-hover:border-primary/20 group-hover:-translate-y-1'}`}>
          <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 bg-primary/10 inline-block px-3 py-1 rounded-full">Día {level.day}</div>
          <h3 className="text-xl font-extrabold text-deep leading-tight group-hover:text-primary transition-colors">{level.title}</h3>
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mt-2">
            <Calendar size={14} />
            {formatLevelDate(level.date)}
          </div>
        </div>
      </div>

      {/* Path */}
      {!isLast && (
        <div className="w-20 flex justify-center my-2">
          <div className="w-1.5 h-16 rounded-full bg-gray-200 overflow-hidden relative">
             {isCompleted && (
               <motion.div 
                 initial={{ height: 0 }}
                 animate={{ height: '100%' }}
                 className="absolute top-0 left-0 right-0 bg-primary" 
               />
             )}
          </div>
        </div>
      )}
    </div>
  );
};
