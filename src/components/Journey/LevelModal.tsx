import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from '../UI/Modal';
import { Lock, Clock, ChevronRight, CheckCircle2, KeyRound, ArrowLeft, MapPin, Camera } from 'lucide-react';
import { formatLevelDateLong, getLevelStatus } from '../../utils/levelStatus';
import { hasAttendanceRecord, saveAttendanceRecord } from '../../utils/attendanceStorage';
import { getPonenciaColumn, isPonenciaType } from '../../utils/attendancePonenciaKeywords';
import { hasPonenciaAttendance, savePonenciaAttendance } from '../../utils/attendanceStorage';
import { getDayActivitiesForDay, getDayActivityDetails } from '../../data/dayActivityLibrary';
import { getLevelLocation } from '../../data/levelLocationLibrary';
import { getQuizForDay, getQuizScore, QUIZ_TOTAL_POINTS } from '../../data/quizLibrary';
import { recordAttendance, recordQuizScore, recordExploredActivity, evaluateAndSave, saveQuizResults } from '../../utils/gamificationStore';

interface LevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: any | null;
  userTicket: string;
  documentId?: string;
  isReviewer?: boolean;
  progress: import('../../utils/gamificationStore').UserProgress | null;
  onProgressUpdate: (progress: import('../../utils/gamificationStore').UserProgress, events: import('../../utils/gamificationStore').GamificationEvent[]) => void;
}

const TICKET_LEVELS: Record<string, number> = {
  ESTANDAR: 1,
  VIP: 2,
  PREMIUM: 3
};

export const LevelModal: React.FC<LevelModalProps> = ({ isOpen, onClose, level, userTicket, documentId, isReviewer = false, progress, onProgressUpdate }) => {
  if (!level) return null;

  const [attendanceInput, setAttendanceInput] = useState('');
  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [attendanceRegistered, setAttendanceRegistered] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [ponenciaInput, setPonenciaInput] = useState('');
  const [ponenciaMessage, setPonenciaMessage] = useState('');
  const [ponenciaRegistered, setPonenciaRegistered] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const daySchedule = getDayActivitiesForDay(level.id);
  const quiz = getQuizForDay(level.id);
  const userLevel = TICKET_LEVELS[userTicket] || 1;
  const isStandardUser = userLevel === TICKET_LEVELS.ESTANDAR;

  const levelStatus = useMemo(() => (isReviewer ? 'available' : getLevelStatus(level.date)), [isReviewer, level.date]);
  const isLockedDay = levelStatus === 'locked';
  const shouldShowSummary = !isStandardUser && (isReviewer || levelStatus === 'completed');

  const locationDetails = getLevelLocation(level.id);
  const selectedActivityDetails = selectedActivity
    ? getDayActivityDetails(level.id, selectedActivity.title, selectedActivity.time)
    : null;
  const isPonencia = !!selectedActivityDetails && isPonenciaType(selectedActivityDetails.type);
  const ponenciaColumn = selectedActivityDetails
    ? getPonenciaColumn(level.id, selectedActivityDetails.title)
    : null;

  const handleQuizSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!quiz) {
      return;
    }

    const score = getQuizScore(quiz, selectedAnswers);
    setQuizScore(score);
    setQuizSubmitted(true);

    // Guardar el resultado del cuestionario en Supabase (CUESTIONARIOS_<día>)
    if (documentId) {
      void saveQuizResults(
        documentId,
        level.id,
        quiz.questions.map((question) => {
          const selectedOption = question.options.find(
            (option) => option.id === selectedAnswers[question.id]
          );
          return selectedOption?.isCorrect ? 1 : 0;
        })
      );
    }

    if (progress && !isStandardUser) {
      const updatedProgress = { ...progress };
      // Always re-evaluate skills/badges so retakes that improve the score
      // can still unlock nodes and badges.
      const quizEvents = recordQuizScore(updatedProgress, level.id, score);
      const evalEvents = evaluateAndSave(updatedProgress);
      onProgressUpdate(updatedProgress, [...quizEvents, ...evalEvents]);
    }
  };

  const handleActivityExplore = (item: any) => {
    setSelectedActivity(item);

    if (progress) {
      const updatedProgress = { ...progress };
      const gamified = !isStandardUser;
      const exploreEvents = recordExploredActivity(updatedProgress, level.id, item.title, gamified);
      const evalEvents = gamified ? evaluateAndSave(updatedProgress) : [];
      onProgressUpdate(updatedProgress, [...exploreEvents, ...evalEvents]);
    }
  };

  useEffect(() => {
    const checkAttendance = async () => {
      if (!documentId) return;

      const exists = await hasAttendanceRecord(documentId, level.id);
      setAttendanceRegistered(exists);
    };

    checkAttendance();
  }, [documentId, level.id]);

  useEffect(() => {
    setQuizOpen(false);
    setSelectedAnswers({});
    setQuizScore(null);
    setQuizSubmitted(false);
  }, [level.id]);

  useEffect(() => {
    setPonenciaInput('');
    setPonenciaMessage('');
    setPonenciaRegistered(false);
    if (!documentId || !selectedActivity) return;

    const column = getPonenciaColumn(level.id, selectedActivity.title);
    if (!column) return;

    void hasPonenciaAttendance(documentId, column).then((exists) => {
      setPonenciaRegistered(exists);
    });
  }, [selectedActivity, documentId, level.id]);

  const handlePonenciaSubmit = async () => {
    if (!ponenciaColumn) {
      setPonenciaMessage('No hay registro disponible para esta ponencia.');
      return;
    }

    if (!documentId) {
      setPonenciaMessage('No se pudo identificar el documento para guardar la asistencia.');
      return;
    }

    if (!ponenciaInput.trim()) {
      setPonenciaMessage('Ingresa la palabra clave de la ponencia para confirmar tu asistencia.');
      return;
    }

    const exists = await hasPonenciaAttendance(documentId, ponenciaColumn);
    if (exists) {
      setPonenciaRegistered(true);
      setPonenciaMessage('ASISTENCIA REGISTRADA');
      return;
    }

    const result = await savePonenciaAttendance({
      documentId,
      column: ponenciaColumn,
      keyword: ponenciaInput.trim(),
    });
    if (result.success) {
      setPonenciaRegistered(true);
      setPonenciaMessage(result.message ?? 'Asistencia a la ponencia registrada correctamente.');
    } else {
      setPonenciaMessage(result.message ?? 'No se pudo guardar la asistencia.');
    }
  };

  const handleAttendanceSubmit = async (event?: React.FormEvent | React.MouseEvent) => {
    event?.preventDefault();

    if (!documentId) {
      setAttendanceMessage('No se pudo identificar el documento para guardar la asistencia.');
      return;
    }

    if (!attendanceInput.trim()) {
      setAttendanceMessage('Ingresa la palabra clave para confirmar tu asistencia.');
      return;
    }

    const exists = await hasAttendanceRecord(documentId, level.id);
    if (exists) {
      setAttendanceRegistered(true);
      setAttendanceMessage('ASISTENCIA REGISTRADA');
      return;
    }

    const result = await saveAttendanceRecord({
      documentId,
      day: level.id,
      keyword: attendanceInput.trim()
    });

    if (result.success) {
      setAttendanceRegistered(true);
      setAttendanceMessage('Asistencia registrada correctamente.');

      if (progress) {
        const updatedProgress = { ...progress };
        const attendanceEvents = recordAttendance(updatedProgress, level.id, !isStandardUser);
        const evalEvents = !isStandardUser ? evaluateAndSave(updatedProgress) : [];
        onProgressUpdate(updatedProgress, [...attendanceEvents, ...evalEvents]);
      }
    } else {
      setAttendanceMessage(result.message ?? 'No se pudo guardar la asistencia.');
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
          <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-200">
            <div className="relative h-64 sm:h-64">
              <img
                src={locationDetails.imageSrc}
                alt={locationDetails.placeName}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-lg">
                  <Camera size={14} /> Lugar
                </div>
                <h3 className="mt-2 text-lg sm:text-2xl font-extrabold leading-tight">{locationDetails.placeName}</h3>
                <p className="mt-1 text-xs sm:text-sm text-white/85 leading-snug">{locationDetails.locationDescription}</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs sm:text-sm text-white">
                  <MapPin size={16} /> {locationDetails.address}
                </div>
              </div>
            </div>
          </div>

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
                  Explora las conferencias y talleres del día.
                </p>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-md hover:bg-secondary transition-colors">
                Comenzar recorrido
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              {isStandardUser
                ? 'El resumen del día está disponible para los planes Premium y VIP. Mientras tanto, puedes registrar tu asistencia para este día.'
                : 'El resumen del día aparecerá cuando el día ya haya pasado. Mientras tanto, puedes registrar tu asistencia para este día.'}
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

          {!isStandardUser && (
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-deep">Cuestionario del día</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Responde el quiz de este día para reforzar el contenido y obtener una puntuación sobre {QUIZ_TOTAL_POINTS}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQuizOpen((prev) => !prev)}
                className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                {quizOpen ? 'Ocultar cuestionario' : 'Realizar cuestionario'}
              </button>
            </div>

            {quizOpen ? (
              quiz ? (
                <form onSubmit={(event) => { event.preventDefault(); handleQuizSubmit(event); }} className="mt-4 space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <h5 className="font-semibold text-deep">{quiz.title}</h5>
                    <p className="mt-2 text-sm text-gray-600">Responde las 10 preguntas del día y obtén una puntuación sobre {QUIZ_TOTAL_POINTS}.</p>
                  </div>

                  <div className="space-y-4">
                    {quiz.questions.map((question) => {
                      const currentAnswer = selectedAnswers[question.id];

                      return (
                        <div key={question.id} className="rounded-xl border border-gray-200 bg-white p-3">
                          <p className="text-sm font-semibold text-deep">{question.prompt}</p>
                          <div className="mt-3 space-y-2">
                            {question.options.map((option) => {
                              const isSelected = currentAnswer === option.id;
                              return (
                                <label
                                  key={option.id}
                                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${isSelected ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 bg-white text-gray-700 hover:border-primary/40'}`}
                                >
                                  <input
                                    type="radio"
                                    name={`quiz-${question.id}`}
                                    checked={isSelected}
                                    onChange={() => {
                                      setSelectedAnswers((prev) => ({ ...prev, [question.id]: option.id }));
                                      if (quizSubmitted) {
                                        setQuizSubmitted(false);
                                        setQuizScore(null);
                                      }
                                    }}
                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                  />
                                  <span>{option.label}</span>
                                </label>
                              );
                            })}
                          </div>

                          {quizSubmitted ? (
                            <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-600">
                              <p className="font-semibold">Explicación</p>
                              <p className="mt-1">{question.explanation}</p>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Enviar respuestas
                    </button>
                    {quizSubmitted && quizScore !== null ? (
                      <span className={`text-sm font-semibold ${quizScore >= 5 ? 'text-green-600' : 'text-amber-600'}`}>
                        Puntuación: {quizScore}/{QUIZ_TOTAL_POINTS}
                      </span>
                    ) : null}
                  </div>
                </form>
              ) : (
                <p className="mt-4 text-sm text-gray-600">No hay un cuestionario disponible para este día.</p>
              )
            ) : null}
          </div>
          )}

          <div className="space-y-4">
            {selectedActivityDetails ? (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <ArrowLeft size={16} /> Volver a actividades
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {selectedActivityDetails.type}
                  </span>
                  <span className="text-sm font-medium text-gray-500">{selectedActivityDetails.time}</span>
                </div>

                <h4 className="text-xl font-bold text-deep">{selectedActivityDetails.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{selectedActivityDetails.description}</p>

                {isPonencia && (
                  <div className="mt-4 rounded-xl border border-primary/20 bg-white p-4 shadow-sm">
                    <h5 className="flex items-center gap-2 font-semibold text-deep">
                      <KeyRound size={16} className="text-primary" />
                      Registrar asistencia a la ponencia
                    </h5>
                    <p className="mt-1 text-sm text-gray-600">
                      {ponenciaRegistered
                        ? 'Ya registraste tu asistencia a esta ponencia.'
                        : `Ingresa la palabra clave proporcionada en la ponencia para confirmar tu asistencia.`}
                    </p>
                    {!ponenciaRegistered ? (
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          void handlePonenciaSubmit();
                        }}
                        className="mt-3 flex flex-col gap-2 sm:flex-row"
                      >
                        <input
                          type="text"
                          value={ponenciaInput}
                          onChange={(e) => {
                            setPonenciaInput(e.target.value);
                            if (ponenciaMessage) setPonenciaMessage('');
                          }}
                          placeholder="Palabra clave de la ponencia"
                          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                        <button
                          type="submit"
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
                    {ponenciaMessage ? <p className="mt-2 text-sm text-gray-600">{ponenciaMessage}</p> : null}
                  </div>
                )}
              </div>
            ) : (
              daySchedule.map((item, idx) => {
                const reqLevel = item.requiresTicket ? TICKET_LEVELS[item.requiresTicket] || 1 : 1;
                const hasAccess = userLevel >= reqLevel;

                return (
                  <div key={idx} className={`relative overflow-hidden flex flex-col sm:flex-row gap-4 p-4 rounded-xl border ${hasAccess ? 'bg-white border-gray-200 hover:border-primary/30 hover:shadow-md transition-all' : 'bg-gray-50 border-gray-200 opacity-75'}`}>
                    <div className="shrink-0 pt-1">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                        <Clock size={14} /> {item.time}
                      </div>
                    </div>

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
                          <div className="shrink-0 flex items-center gap-1 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                            <Lock size={12} /> {item.requiresTicket}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end sm:justify-start">
                      {hasAccess ? (
                        <button
                          type="button"
                          onClick={() => handleActivityExplore(item)}
                          className="w-10 h-10 rounded-full bg-gray-50 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition-colors border border-gray-200 hover:border-primary"
                        >
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
              })
            )}
            
            {daySchedule.length === 0 && (
              <p className="text-center text-gray-500 py-8">No hay actividades programadas aún.</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
