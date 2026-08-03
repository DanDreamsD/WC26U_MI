import React from 'react';
import { Modal } from '../UI/Modal';
import { Crown, Award, LogOut, Zap, Calendar, CheckSquare, Compass, Lock } from 'lucide-react';
import type { UserProgress } from '../../utils/gamificationStore';
import { BADGE_DEFINITIONS, RARITY_COLORS } from '../../data/badgeDefinitions';
import { getLevelForXp, getNextLevel, getXpProgress } from '../../data/levelDefinitions';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: any;
  progress: UserProgress | null;
}

export const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, onLogout, user, progress }) => {
  const isStandard = user.ticketType === 'ESTANDAR';
  const xp = progress?.xp ?? 0;
  const levelDef = getLevelForXp(xp);
  const nextLevel = getNextLevel(levelDef.level);
  const xpPercent = getXpProgress(xp);

  const earnedBadgeIds = progress?.earnedBadges ?? [];
  
  // Separate earned and locked badges
  const earnedBadges = BADGE_DEFINITIONS.filter((b) => earnedBadgeIds.includes(b.id));
  const lockedBadges = BADGE_DEFINITIONS.filter((b) => !earnedBadgeIds.includes(b.id));

  // Stats
  const attendanceCount = progress?.attendanceDays.length ?? 0;
  const quizzesCount = progress?.quizzesCompleted.length ?? 0;
  const exploreCount = progress?.exploredActivities.length ?? 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Perfil del Participante">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-primary/20 mb-4">
          {user.name.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold text-deep">{user.name}</h2>
        <p className="text-gray-500">{user.career} • {user.university}</p>
        
        <div className="mt-4 px-4 py-1.5 bg-primary/10 rounded-full flex items-center gap-2 border border-primary/20">
          <Crown size={16} className="text-primary" />
          <span className="font-bold text-primary text-sm">{user.ticketType} PASS</span>
        </div>
      </div>

      {/* Nivel y XP */}
      {!isStandard && (
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="text-gray-500 text-sm font-medium">Nivel {levelDef.level}</div>
            <div className="text-xl font-bold text-deep">{levelDef.title}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-amber-500 flex items-center gap-1 justify-end">
              <Zap size={20} className="fill-current" /> {xp}
            </div>
            <div className="text-xs text-gray-400 font-bold tracking-wider uppercase">XP Total</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 font-medium mb-1.5">
            <span>Progreso</span>
            <span>{nextLevel ? `${xp} / ${nextLevel.xpRequired} XP` : 'Nivel Máximo'}</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700 ease-out"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          {nextLevel && (
            <p className="text-xs text-center text-gray-400 mt-2">
              Te faltan <span className="font-bold text-gray-500">{nextLevel.xpRequired - xp} XP</span> para ser {nextLevel.title}
            </p>
          )}
        </div>
      </div>
      )}

      {/* Estadísticas */}
      {!isStandard && (
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
          <Calendar size={18} className="mx-auto text-primary mb-1" />
          <div className="text-xl font-bold text-deep">{attendanceCount}<span className="text-sm text-gray-400">/5</span></div>
          <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-1">Días</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
          <CheckSquare size={18} className="mx-auto text-green-500 mb-1" />
          <div className="text-xl font-bold text-deep">{quizzesCount}<span className="text-sm text-gray-400">/5</span></div>
          <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-1">Quizzes</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
          <Compass size={18} className="mx-auto text-blue-500 mb-1" />
          <div className="text-xl font-bold text-deep">{exploreCount}</div>
          <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-1">Explorado</div>
        </div>
      </div>
      )}

      {/* Insignias Obtenidas */}
      {isStandard ? (
        <div className="mb-8 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-center">
          <Award size={28} className="mx-auto text-primary/50 mb-2" />
          <h3 className="font-bold text-deep">Plataforma informativa</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-snug">
            Con tu pase Estándar puedes consultar el programa, las actividades y registrar tu asistencia. Los puntos, niveles e insignias están disponibles en los planes Premium y VIP.
          </p>
        </div>
      ) : (
      <>
      <div className="mb-8">
        <h3 className="text-lg font-bold text-deep mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2"><Award size={20} className="text-primary" /> Mis Insignias</span>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{earnedBadges.length} / {BADGE_DEFINITIONS.length}</span>
        </h3>
        
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="flex gap-3 p-3 bg-white border border-primary/20 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                  {badge.icon}
                </div>
                <div>
                  <div className="font-bold text-deep text-sm leading-tight">{badge.name}</div>
                  <div className="text-[11px] text-gray-500 mt-1 leading-snug">{badge.description}</div>
                  <div className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${RARITY_COLORS[badge.rarity]}`}>
                    {badge.rarity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <Award size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Aún no has ganado insignias.</p>
            <p className="text-gray-400 text-xs mt-1">Participa en las actividades para desbloquearlas.</p>
          </div>
        )}
      </div>

      {/* Insignias Bloqueadas */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Lock size={14} /> Por desbloquear
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="flex gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-xl opacity-50">
                  {badge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-700 text-sm truncate">{badge.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}

      {/* Logout */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => { onClose(); onLogout(); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 hover:border-red-300 transition-all"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </Modal>
  );
};
