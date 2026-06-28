import React from 'react';
import { Modal } from '../UI/Modal';
import { Target, CheckCircle2 } from 'lucide-react';
import missionsData from '../../data/missions.json';

interface PassportProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export const Passport: React.FC<PassportProps> = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Passport Challenge">
      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-6">
        <h4 className="font-semibold text-primary mb-1">Retos Diarios</h4>
        <p className="text-sm text-gray-600">Completa estas misiones durante el congreso para ganar XP y desbloquear insignias exclusivas.</p>
      </div>

      <div className="space-y-3">
        {missionsData.map(mission => {
          const isCompleted = user.completedMissions.includes(mission.id);
          return (
            <div key={mission.id} className={`flex items-center justify-between p-4 rounded-xl border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-primary/30'} transition-all`}>
              <div className="flex items-center gap-4">
                {isCompleted ? (
                  <CheckCircle2 size={24} className="text-green-500 flex-shrink-0" />
                ) : (
                  <Target size={24} className="text-gray-300 flex-shrink-0" />
                )}
                <div>
                  <div className={`font-semibold ${isCompleted ? 'text-green-800' : 'text-deep'}`}>{mission.title}</div>
                  <div className="text-sm text-gray-500">Día {mission.dayId}</div>
                </div>
              </div>
              <div className={`font-bold text-sm ${isCompleted ? 'text-green-600' : 'text-primary'}`}>
                +{mission.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
