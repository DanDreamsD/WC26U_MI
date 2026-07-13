import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GamificationEvent } from '../../utils/gamificationStore';
import { playXpSound, playBadgeSound, playLevelUpSound } from '../../utils/sounds';

interface XpNotificationProps {
  events: GamificationEvent[];
  onClear: () => void;
}

const EVENT_DISPLAY_MS = 3200;
const EVENT_STAGGER_MS = 500;

const typeStyles: Record<GamificationEvent['type'], { bg: string; border: string; glow: string }> = {
  xp: {
    bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    border: 'border-emerald-300/50',
    glow: 'shadow-[0_8px_32px_-8px_rgba(16,185,129,0.6)]',
  },
  badge: {
    bg: 'bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500',
    border: 'border-amber-300/50',
    glow: 'shadow-[0_8px_32px_-8px_rgba(245,158,11,0.6)]',
  },
  skill: {
    bg: 'bg-gradient-to-r from-violet-500 via-primary to-secondary',
    border: 'border-violet-300/50',
    glow: 'shadow-[0_8px_32px_-8px_rgba(132,12,215,0.6)]',
  },
  'level-up': {
    bg: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600',
    border: 'border-fuchsia-300/50',
    glow: 'shadow-[0_8px_32px_-8px_rgba(192,38,211,0.6)]',
  },
};

const typeIcons: Record<GamificationEvent['type'], string> = {
  xp: '✦',
  badge: '🏆',
  skill: '🔓',
  'level-up': '🎉',
};

interface DisplayEvent extends GamificationEvent {
  key: string;
}

// Play the appropriate sound for an event type
const playSoundForEvent = (type: GamificationEvent['type']) => {
  switch (type) {
    case 'xp':
      playXpSound();
      break;
    case 'badge':
      playBadgeSound();
      break;
    case 'level-up':
      playLevelUpSound();
      break;
    case 'skill':
      playBadgeSound();
      break;
  }
};

export const XpNotification: React.FC<XpNotificationProps> = ({ events, onClear }) => {
  const [visibleEvents, setVisibleEvents] = useState<DisplayEvent[]>([]);

  useEffect(() => {
    if (events.length === 0) return;

    const newEvents: DisplayEvent[] = events.map((e, i) => ({
      ...e,
      key: `${Date.now()}-${i}`,
    }));

    newEvents.forEach((event, index) => {
      setTimeout(() => {
        setVisibleEvents((prev) => [...prev, event]);
        playSoundForEvent(event.type);

        setTimeout(() => {
          setVisibleEvents((prev) => prev.filter((e) => e.key !== event.key));
        }, EVENT_DISPLAY_MS);
      }, index * EVENT_STAGGER_MS);
    });

    const totalTime = newEvents.length * EVENT_STAGGER_MS + EVENT_DISPLAY_MS + 300;
    const timer = setTimeout(() => {
      onClear();
    }, totalTime);

    return () => clearTimeout(timer);
  }, [events, onClear]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3 max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {visibleEvents.map((event) => {
          const style = typeStyles[event.type];
          return (
            <motion.div
              key={event.key}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.7, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 100, scale: 0.85, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl border text-white backdrop-blur-xl ${style.bg} ${style.border} ${style.glow}`}
            >
              {/* Icon with pulse */}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-xl flex-shrink-0"
              >
                {event.icon || typeIcons[event.type]}
              </motion.span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.15em] opacity-70 mb-0.5">
                  {event.type === 'xp' ? 'Experiencia' : event.type === 'badge' ? 'Insignia' : event.type === 'skill' ? 'Habilidad' : 'Nivel'}
                </div>
                <div className="text-sm font-bold leading-tight truncate">
                  {event.label}
                </div>
              </div>

              {/* XP Value with glow */}
              {event.value !== undefined && event.type === 'xp' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="flex-shrink-0 text-lg font-black bg-white/20 rounded-xl px-3 py-1"
                >
                  +{event.value}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
