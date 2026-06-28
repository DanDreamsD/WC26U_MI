import React from 'react';
import { Modal } from '../UI/Modal';
import scheduleData from '../../data/schedule.json';
import { Lock, Clock, ChevronRight } from 'lucide-react';

interface LevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: any | null;
  userTicket: string;
}

const TICKET_LEVELS: Record<string, number> = {
  STANDARD: 1,
  VIP: 2,
  PREMIUM: 3
};

export const LevelModal: React.FC<LevelModalProps> = ({ isOpen, onClose, level, userTicket }) => {
  if (!level) return null;

  const daySchedule = scheduleData.filter(s => s.dayId === level.id);
  const userLevel = TICKET_LEVELS[userTicket] || 1;

  const isLockedDay = level.status === 'locked';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Día ${level.day}: ${level.title}`}>
      {isLockedDay ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-deep mb-2">Contenido Bloqueado</h3>
          <p className="text-gray-500 max-w-sm">
            Este día aún no está disponible. Podrás acceder a partir del {new Date(level.date).toLocaleDateString('es-PE', { month: 'long', day: 'numeric', timeZone: 'UTC' })}.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-primary mb-1">Resumen del Día</h4>
              <p className="text-sm text-gray-600">Explora las conferencias y talleres de hoy.</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-md hover:bg-secondary transition-colors">
              Comenzar recorrido
            </button>
          </div>

          <div className="space-y-4">
            {daySchedule.map((item, idx) => {
              const reqLevel = TICKET_LEVELS[item.requiresTicket] || 1;
              const hasAccess = userLevel >= reqLevel;

              return (
                <div key={idx} className={`relative overflow-hidden flex flex-col sm:flex-row gap-4 p-4 rounded-xl border ${hasAccess ? 'bg-white border-gray-200 hover:border-primary/30 hover:shadow-md transition-all' : 'bg-gray-50 border-gray-200 opacity-75'}`}>
                  
                  {/* Time badge */}
                  <div className="flex-shrink-0 pt-1">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                      <Clock size={14} /> {item.time}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase ${hasAccess ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'}`}>
                          {item.type}
                        </span>
                        <h4 className={`text-lg font-bold mt-1 ${hasAccess ? 'text-deep' : 'text-gray-600'}`}>{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.speaker}</p>
                      </div>

                      {!hasAccess && (
                        <div className="flex-shrink-0 flex items-center gap-1 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                          <Lock size={12} /> {item.requiresTicket}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-end sm:justify-start">
                    {hasAccess ? (
                      <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition-colors border border-gray-200 hover:border-primary">
                        <ChevronRight size={20} />
                      </button>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <Lock size={16} />
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
            
            {daySchedule.length === 0 && (
              <p className="text-center text-gray-500 py-8">No hay actividades programadas aún.</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
