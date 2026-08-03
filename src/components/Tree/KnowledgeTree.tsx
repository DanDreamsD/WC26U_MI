import React, { useState } from 'react';
import { Modal } from '../UI/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Play, FileText, Info, Sparkles, ChevronLeft, Zap } from 'lucide-react';
import knowledgeData from '../../data/knowledge.json';
import { getSkillResource } from '../../data/skillLinks';
import type { UserProgress } from '../../utils/gamificationStore';
import { getUnlockRule } from '../../data/skillUnlockRules';

interface KnowledgeTreeProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress | null;
}

/* ── Branch icon/color mapping ─────────────────────────────────── */
const branchThemes: Record<string, { gradient: string; glow: string; accent: string; icon: string }> = {
  b1: {
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    glow: 'rgba(139,92,246,0.45)',
    accent: 'violet',
    icon: '🎯',
  },
  b2: {
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    glow: 'rgba(59,130,246,0.45)',
    accent: 'blue',
    icon: '🚀',
  },
  b3: {
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    glow: 'rgba(20,184,166,0.45)',
    accent: 'teal',
    icon: '⚙️',
  },
};

/* ── Animation variants ────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
} as const;

const branchVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.92,
    transition: { duration: 0.25, ease: 'easeInOut' as const },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24, delay: i * 0.08 },
  }),
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const detailVariants = {
  hidden: { opacity: 0, x: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 26 },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.95,
    transition: { duration: 0.25, ease: 'easeInOut' as const },
  },
};

const rootVariants = {
  hidden: { opacity: 0, scale: 0.6, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.6, y: -20, transition: { duration: 0.2 } },
};

/* ── Animated connector line ───────────────────────────────────── */
const ConnectorLine: React.FC<{ completed: boolean }> = ({ completed }) => (
  <div className="flex justify-center my-0.5">
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ originY: 0 }}
      className={`w-0.5 h-5 rounded-full ${
        completed
          ? 'bg-gradient-to-b from-primary/60 to-primary/20'
          : 'bg-gradient-to-b from-gray-200 to-gray-100'
      }`}
    />
  </div>
);

/* ═════════════════════════════════════════════════════════════════
   Main Component
   ═════════════════════════════════════════════════════════════════ */
export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({ isOpen, onClose, progress }) => {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const selectedResource = selectedNode ? getSkillResource(selectedNode.id) : null;
  const userUnlockedNodes = progress?.unlockedNodes ?? [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mis nuevas habilidades">
      <AnimatePresence mode="wait">
        {!selectedNode ? (
          /* ═══ TREE VIEW ══════════════════════════════════════════ */
          <motion.div
            key="tree"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 p-1"
          >
            {/* ── Root node ──────────────────────────────────────── */}
            <motion.div variants={rootVariants} className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-primary via-secondary to-dark text-white font-extrabold rounded-full shadow-lg shadow-primary/30 text-sm tracking-wide"
              >
                <Sparkles size={16} className="opacity-80" />
                {knowledgeData.root}
                {/* Animated glow ring */}
                <span className="absolute inset-0 rounded-full animate-[pulse_2.5s_ease-in-out_infinite] bg-primary/15" />
              </motion.div>

              {/* Root to branches connector */}
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid meet">
                <motion.line
                  x1="150" y1="0" x2="150" y2="20"
                  stroke="url(#connGrad)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <motion.line
                  x1="50" y1="20" x2="250" y2="20"
                  stroke="url(#connGrad)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                />
                {[50, 150, 250].map((x, i) => (
                  <motion.line
                    key={i} x1={x} y1="20" x2={x} y2="38"
                    stroke="url(#connGrad)" strokeWidth="2" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                  />
                ))}
                <defs>
                  <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(132,12,215,0.5)" />
                    <stop offset="100%" stopColor="rgba(97,5,163,0.3)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* ── Intro description ──────────────────────────────── */}
            <motion.p
              variants={branchVariants}
              className="text-center text-sm text-gray-500 leading-relaxed px-2 max-w-md mx-auto -mt-1"
            >
              A medida que avances por los días del CEIISE 2026 y completes tus actividades, se irán
              desbloqueando nuevas habilidades. ¡Domínalas todas!
            </motion.p>

            {/* ── Branches grid ──────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {knowledgeData.branches.map((branch) => {
                const theme = branchThemes[branch.id] ?? branchThemes.b1;
                const branchNodesUnlocked = branch.nodes.filter((n) =>
                  userUnlockedNodes.includes(n.id)
                ).length;
                const branchProgress = Math.round(
                  (branchNodesUnlocked / branch.nodes.length) * 100
                );

                return (
                  <motion.div
                    key={branch.id}
                    variants={branchVariants}
                    className="relative flex flex-col items-center rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden"
                  >
                    {/* Decorative top gradient band */}
                    <div className={`w-full h-1 bg-gradient-to-r ${theme.gradient}`} />

                    {/* Branch header */}
                    <div className="w-full px-4 pt-4 pb-2 flex flex-col items-center">
                      <span className="text-2xl mb-1">{theme.icon}</span>
                      <h3 className="text-sm font-extrabold text-deep tracking-tight text-center leading-tight">
                        {branch.name}
                      </h3>

                      {/* Progress bar */}
                      <div className="w-full mt-2.5 mb-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Progreso
                          </span>
                          <span className={`text-[10px] font-extrabold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                            {branchProgress}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${branchProgress}%` }}
                            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${theme.gradient}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Skill nodes ──────────────────────────── */}
                    <div className="w-full px-3 pb-4 flex flex-col items-center">
                      {branch.nodes.map((node, nodeIdx) => {
                        const isUnlocked = userUnlockedNodes.includes(node.id);
                        const isCompleted = isUnlocked;
                        const isLocked = !isCompleted;
                        const unlockRule = getUnlockRule(node.id);

                        return (
                          <React.Fragment key={node.id}>
                            {nodeIdx > 0 && <ConnectorLine completed={isCompleted} />}

                            <motion.div
                              custom={nodeIdx}
                              variants={nodeVariants}
                              className="relative w-full group"
                            >
                              <motion.button
                                whileHover={!isLocked ? { scale: 1.04, y: -2 } : {}}
                                whileTap={!isLocked ? { scale: 0.97 } : {}}
                                onClick={() => !isLocked && setSelectedNode(node)}
                                disabled={isLocked}
                                className={`relative w-full p-3.5 rounded-xl border text-center transition-all duration-300 ${
                                  isCompleted
                                    ? 'bg-gradient-to-br from-primary/90 to-secondary/90 border-primary/40 text-white shadow-lg cursor-pointer'
                                    : 'bg-gray-50/80 border-gray-200/60 cursor-not-allowed'
                                }`}
                                style={
                                  isCompleted
                                    ? { boxShadow: `0 6px 28px -4px ${theme.glow}` }
                                    : undefined
                                }
                              >
                                {/* Glowing shimmer on completed nodes */}
                                {isCompleted && (
                                  <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                                  </span>
                                )}

                                {isLocked && (
                                  <Lock
                                    size={12}
                                    className="absolute top-2 right-2 text-gray-300"
                                  />
                                )}

                                <div className="flex items-center justify-center gap-1.5">
                                  {isCompleted && <Zap size={13} className="text-white/80 flex-shrink-0" />}
                                  <span
                                    className={`font-bold text-xs leading-tight ${
                                      isCompleted ? 'text-white' : 'text-gray-400'
                                    }`}
                                  >
                                    {node.name}
                                  </span>
                                </div>

                                <div
                                  className={`text-[9px] mt-1 font-bold uppercase tracking-widest ${
                                    isCompleted ? 'text-white/60' : 'text-gray-300'
                                  }`}
                                >
                                  {isCompleted ? '✓ Completado' : 'Bloqueado'}
                                </div>
                              </motion.button>

                              {/* Tooltip for locked nodes */}
                              {isLocked && unlockRule && (
                                <div className="absolute top-1/2 -translate-y-1/2 left-full ml-3 w-52 p-2.5 bg-gray-900/95 backdrop-blur-md text-white text-[11px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 pointer-events-none shadow-2xl border border-white/10">
                                  <div className="flex items-center gap-1.5 mb-1.5 text-primary/80 font-extrabold uppercase tracking-widest text-[9px]">
                                    <Info size={10} />
                                    Cómo desbloquear
                                  </div>
                                  <p className="leading-relaxed text-gray-200">{unlockRule.hint}</p>
                                  <div className="absolute top-1/2 -translate-y-1/2 right-full border-[5px] border-transparent border-r-gray-900/95" />
                                </div>
                              )}
                            </motion.div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Bottom legend ────────────────────────────────── */}
            <motion.div
              variants={branchVariants}
              className="flex items-center justify-center gap-5 pt-2 pb-1"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-secondary shadow-sm shadow-primary/30" />
                <span className="text-[10px] text-gray-400 font-semibold">Desbloqueado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-gray-300" />
                <span className="text-[10px] text-gray-400 font-semibold">Bloqueado</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ═══ DETAIL VIEW ═════════════════════════════════════ */
          <motion.div
            key="detail"
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col space-y-5"
          >
            {/* Back button */}
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedNode(null)}
              className="self-start flex items-center gap-1.5 text-sm font-bold text-primary hover:text-secondary transition-colors group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              Volver al árbol
            </motion.button>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-6 rounded-2xl border border-primary/15 shadow-sm overflow-hidden"
            >
              {/* Decorative blobs */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/25 flex-shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-deep tracking-tight">
                      {selectedNode.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                      {selectedResource?.description ??
                        'Competencia desarrollada durante el CEIISE 2026. Esta habilidad es fundamental para destacar en entornos industriales modernos.'}
                    </p>
                  </div>
                </div>

                {/* Badge */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold rounded-full border border-primary/20">
                    <Zap size={11} />
                    Desbloqueado mediante actividades
                  </span>
                </div>

                {/* Resources */}
                <div className="space-y-2.5">
                  <h4 className="font-extrabold text-deep text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span className="w-4 h-px bg-primary/30" />
                    Materiales de la sesión
                  </h4>

                  {/* Recording */}
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200/70 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 text-gray-400 flex items-center justify-center">
                        <Play size={17} className="ml-0.5" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-500 text-sm">
                          Grabación de Ponencia
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {selectedResource
                            ? `${selectedResource.recording.duration} • ${selectedResource.recording.quality}`
                            : '45 min • 1080p'}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-200/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Disponible próximamente
                    </span>
                  </div>

                  {/* Presentation */}
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200/70 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 text-gray-400 flex items-center justify-center">
                        <FileText size={17} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-500 text-sm">
                          Presentación PDF
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {selectedResource?.presentation.format ?? 'PDF'}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-200/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Disponible próximamente
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
