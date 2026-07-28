import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Calendar, CheckSquare, Compass, RotateCcw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import {
  addXp,
  recordAttendance,
  recordQuizScore,
  recordExploredActivity,
  evaluateAndSave,
  createEmptyProgress,
  saveProgress,
  type UserProgress,
  type GamificationEvent,
} from '../../utils/gamificationStore';
import { dayActivityLibrary } from '../../data/dayActivityLibrary';
import { getLevelForXp } from '../../data/levelDefinitions';

interface DevPanelProps {
  progress: UserProgress | null;
  onProgressUpdate: (progress: UserProgress, events: GamificationEvent[]) => void;
}

export const DevPanel: React.FC<DevPanelProps> = ({ progress, onProgressUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [xpAmount, setXpAmount] = useState(50);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  if (!progress) return null;

  const levelDef = getLevelForXp(progress.xp);

  const handleAddXp = () => {
    const updated = { ...progress };
    const events = addXp(updated, xpAmount, `XP manual: +${xpAmount}`);
    const evalEvents = evaluateAndSave(updated);
    onProgressUpdate(updated, [...events, ...evalEvents]);
  };

  const handleAttendance = (day: number) => {
    const updated = { ...progress };
    const events = recordAttendance(updated, day);
    if (events.length > 0) {
      const evalEvents = evaluateAndSave(updated);
      onProgressUpdate(updated, [...events, ...evalEvents]);
    }
  };

  const handleQuiz = (day: number, score: number) => {
    const updated = { ...progress };
    const events = recordQuizScore(updated, day, score);
    if (events.length > 0) {
      const evalEvents = evaluateAndSave(updated);
      onProgressUpdate(updated, [...events, ...evalEvents]);
    }
  };

  const handleExplore = (day: number, title: string) => {
    const updated = { ...progress };
    const events = recordExploredActivity(updated, day, title);
    if (events.length > 0) {
      const evalEvents = evaluateAndSave(updated);
      onProgressUpdate(updated, [...events, ...evalEvents]);
    }
  };

  const handleExploreAll = (day: number) => {
    const activities = dayActivityLibrary[day] ?? [];
    const uniqueTitles = [...new Set(activities.map((a) => a.title))];
    let allEvents: GamificationEvent[] = [];

    const updated = { ...progress };
    for (const title of uniqueTitles) {
      const events = recordExploredActivity(updated, day, title);
      allEvents = [...allEvents, ...events];
    }
    if (allEvents.length > 0) {
      const evalEvents = evaluateAndSave(updated);
      onProgressUpdate(updated, [...allEvents, ...evalEvents]);
    }
  };

  const handleReset = () => {
    const empty = createEmptyProgress(progress.documentId);
    saveProgress(empty);
    onProgressUpdate(empty, []);
  };

  const handleSimulateDay = (day: number) => {
    let allEvents: GamificationEvent[] = [];
    const updated = { ...progress };

    // Attendance
    const attEvents = recordAttendance(updated, day);
    allEvents = [...allEvents, ...attEvents];

    // Quiz with 8/10
    const quizEvents = recordQuizScore(updated, day, 8);
    allEvents = [...allEvents, ...quizEvents];

    // Explore all activities
    const activities = dayActivityLibrary[day] ?? [];
    const uniqueTitles = [...new Set(activities.map((a) => a.title))];
    for (const title of uniqueTitles) {
      const events = recordExploredActivity(updated, day, title);
      allEvents = [...allEvents, ...events];
    }

    if (allEvents.length > 0) {
      const evalEvents = evaluateAndSave(updated);
      onProgressUpdate(updated, [...allEvents, ...evalEvents]);
    }
  };

  const uniqueActivities = (day: number) => {
    const activities = dayActivityLibrary[day] ?? [];
    return [...new Set(activities.map((a) => a.title))];
  };

  const isExplored = (day: number, title: string) =>
    progress.exploredActivities.includes(`${day}-${title}`);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-6 left-6 z-[90] w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30 flex items-center justify-center hover:shadow-red-500/50 transition-shadow"
        title="Dev Panel"
      >
        <Bug size={22} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-6 z-[90] w-[380px] max-h-[75vh] bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bug size={18} />
                <span className="font-bold text-sm">Dev Panel — Simulación</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-lg">
                ×
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {/* Current State */}
              <div className="bg-gray-800 rounded-xl p-3 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Estado actual</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-black text-amber-400">{progress.xp}</div>
                    <div className="text-[10px] text-gray-500">XP</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-fuchsia-400">{levelDef.level}</div>
                    <div className="text-[10px] text-gray-500">{levelDef.title}</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-emerald-400">{progress.earnedBadges.length}</div>
                    <div className="text-[10px] text-gray-500">Insignias</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold text-blue-400">{progress.attendanceDays.length}/5</div>
                    <div className="text-[10px] text-gray-500">Asistencias</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-400">{progress.quizzesCompleted.length}/5</div>
                    <div className="text-[10px] text-gray-500">Quizzes</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-cyan-400">{progress.exploredActivities.length}</div>
                    <div className="text-[10px] text-gray-500">Exploradas</div>
                  </div>
                </div>
              </div>

              {/* Add XP */}
              <div className="bg-gray-800 rounded-xl p-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Agregar XP</div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={xpAmount}
                    onChange={(e) => setXpAmount(Number(e.target.value))}
                    className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleAddXp}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors"
                  >
                    <Zap size={14} /> +XP
                  </button>
                </div>
              </div>

              {/* Quick simulate all days */}
              <div className="bg-gray-800 rounded-xl p-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Simulación rápida</div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <button
                      key={day}
                      onClick={() => handleSimulateDay(day)}
                      className="py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold transition-colors"
                    >
                      Día {day}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5 text-center">Asistencia + Quiz 8/10 + Todas las actividades</p>
              </div>

              {/* Per-day controls */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Control por día</div>
                {[1, 2, 3, 4, 5].map((day) => {
                  const isExpanded = expandedDay === day;
                  const attended = progress.attendanceDays.includes(day);
                  const quizDone = progress.quizzesCompleted.includes(day);
                  const activities = uniqueActivities(day);
                  const exploredCount = activities.filter((t) => isExplored(day, t)).length;

                  return (
                    <div key={day} className="bg-gray-800 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : day)}
                        className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">Día {day}</span>
                          {attended && <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Asist.</span>}
                          {quizDone && <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Quiz</span>}
                          <span className="text-[10px] text-gray-500">{exploredCount}/{activities.length}</span>
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3 space-y-2 border-t border-gray-700">
                              {/* Attendance */}
                              <div className="flex items-center justify-between pt-2">
                                <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} /> Asistencia</span>
                                <button
                                  onClick={() => handleAttendance(day)}
                                  disabled={attended}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                    attended ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                                  }`}
                                >
                                  {attended ? '✓ Registrada' : 'Registrar'}
                                </button>
                              </div>

                              {/* Quiz */}
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 flex items-center gap-1"><CheckSquare size={12} /> Quiz</span>
                                <div className="flex gap-1">
                                  {[0, 5, 8, 10].map((score) => (
                                    <button
                                      key={score}
                                      onClick={() => handleQuiz(day, score)}
                                      className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                                        score === 10 ? 'bg-amber-600 hover:bg-amber-500' :
                                        score >= 7 ? 'bg-green-600 hover:bg-green-500' :
                                        score >= 5 ? 'bg-blue-600 hover:bg-blue-500' :
                                        'bg-red-600 hover:bg-red-500'
                                      }`}
                                    >
                                      {score}/10
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Activities */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400 flex items-center gap-1"><Compass size={12} /> Actividades</span>
                                  <button
                                    onClick={() => handleExploreAll(day)}
                                    className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-bold transition-colors"
                                  >
                                    Explorar todas
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                  {activities.map((title) => {
                                    const done = isExplored(day, title);
                                    return (
                                      <button
                                        key={title}
                                        onClick={() => handleExplore(day, title)}
                                        disabled={done}
                                        className={`text-left px-2 py-1 rounded text-[11px] truncate transition-colors ${
                                          done ? 'bg-gray-700 text-gray-500' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                        }`}
                                        title={title}
                                      >
                                        {done ? '✓ ' : ''}{title}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-xl text-red-400 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw size={14} /> Resetear progreso
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
