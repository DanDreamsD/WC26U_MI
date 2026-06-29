import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from '../UI/Modal';
import scheduleData from '../../data/schedule.json';
import { Lock, Clock, ChevronRight, CheckCircle2, KeyRound } from 'lucide-react';
import { formatLevelDateLong, getLevelStatus } from '../../utils/levelStatus';
import { attendanceKeywordsByDay } from '../../utils/attendanceKeywords';
import { hasAttendanceRecord, saveAttendanceRecord } from '../../utils/attendanceStorage';

interface LevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: any | null;
  userTicket: string;
  documentId?: string;
}

const TICKET_LEVELS: Record<string, number> = {
  STANDARD: 1,
  VIP: 2,
  PREMIUM: 3
};

export const LevelModal: React.FC<LevelModalProps> = ({ isOpen, onClose, level, userTicket, documentId }) => {
  if (!level) return null;

  const [attendanceInput, setAttendanceInput] = useState('');
  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [attendanceRegistered, setAttendanceRegistered] = useState(false);

  const daySchedule = scheduleData.filter(s => s.dayId === level.id);
  const userLevel = TICKET_LEVELS[userTicket] || 1;
  const isStandardUser = userLevel === TICKET_LEVELS.STANDARD;

  const levelStatus = useMemo(() => getLevelStatus(level.date), [level.date]);
  const isLockedDay = levelStatus === 'locked';
  const shouldShowSummary = levelStatus === 'completed' || isStandardUser;

  const keyword = attendanceKeywordsByDay[level.id];

  useEffect(() => {
    const checkAttendance = async () => {
      if (!documentId) return;

      const exists = await hasAttendanceRecord(documentId, level.id);
      setAttendanceRegistered(exists);
    };

    checkAttendance();
  }, [documentId, level.id]);

  const handleAttendanceSubmit = async (event?: React.FormEvent | React.MouseEvent) => {
    event?.preventDefault();

    if (!keyword) {
      setAttendanceMessage('No hay palabra clave disponible para este día.');
      return;
    }

    if (attendanceInput.trim().toUpperCase() === keyword) {
      if (!documentId) {
        setAttendanceMessage('No se pudo identificar el documento para guardar la asistencia.');
        return;
      }

      const result = await saveAttendanceRecord({
        documentId,
        day: level.id,
        keyword
      });

      if (result.success) {
        setAttendanceRegistered(true);
        setAttendanceMessage('Asistencia registrada correctamente.');
      } else {
        setAttendanceMessage(result.message ?? 'No se pudo guardar la asistencia.');
      }
    } else {
      setAttendanceMessage('La palabra clave es incorrecta. Intenta nuevamente.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Día ${level.day}: ${level.title}`}>
      {isLockedDay ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-deep mb-2">Contenido Bloqueado</h3>
          <p className="text-gray-500 max-w-sm">
            Este día aún no está disponible. Podrás acceder a partir del {formatLevelDateLong(level.date)}.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {isStandardUser ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              Puedes registrar tu asistencia desde aquí. El contenido completo y los recorridos detallados siguen reservados para Premium o VIP.
            </div>
          ) : null}

          {shouldShowSummary ? (
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-primary mb-1">Resumen del Día</h4>
                <p className="text-sm text-gray-600">
                  {isStandardUser
                    ? 'Consulta el resumen general del día y registra tu asistencia. Los detalles completos siguen reservados para Premium o VIP.'
                    : 'Explora las conferencias y talleres del día.'}
                </p>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-md hover:bg-secondary transition-colors">
                Comenzar recorrido
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              El resumen del día aparecerá cuando el día ya haya pasado. Mientras tanto, puedes registrar tu asistencia para este día.
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <KeyRound size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-deep">Registrar asistencia</h4>
                <p className="mt-1 text-sm text-gray-600">
                  {attendanceRegistered
                    ? 'Tu asistencia ya fue registrada para este día.'
                    : `Ingresa la palabra clave provisional para confirmar tu asistencia del día ${level.day}.`}
                </p>
                {!attendanceRegistered ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      void handleAttendanceSubmit(event);
                    }}
                    className="mt-3 flex flex-col gap-2 sm:flex-row"
                  >
                    <input
                      type="text"
                      value={attendanceInput}
                      onChange={(e) => {
                        setAttendanceInput(e.target.value);
                        if (attendanceMessage) setAttendanceMessage('');
                      }}
                      placeholder="Palabra clave"
                      className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        void handleAttendanceSubmit();
                      }}
                      className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary"
                    >
                      Confirmar
                    </button>
                  </form>
                ) : (
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-600">
                    <CheckCircle2 size={16} />
                    Asistencia confirmada
                  </div>
                )}
                {attendanceMessage ? <p className="mt-2 text-sm text-gray-600">{attendanceMessage}</p> : null}
              </div>
            </div>
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
