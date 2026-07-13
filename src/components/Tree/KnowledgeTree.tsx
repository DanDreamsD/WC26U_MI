import React, { useState } from 'react';
import { Modal } from '../UI/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Play, FileText, Download, Info } from 'lucide-react';
import knowledgeData from '../../data/knowledge.json';
import { getSkillResource } from '../../data/skillLinks';
import type { UserProgress } from '../../utils/gamificationStore';
import { getUnlockRule } from '../../data/skillUnlockRules';

interface KnowledgeTreeProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress | null;
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({ isOpen, onClose, progress }) => {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const selectedResource = selectedNode ? getSkillResource(selectedNode.id) : null;
  const userUnlockedNodes = progress?.unlockedNodes ?? [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mis nuevas habilidades">
      
      {!selectedNode ? (
        <div className="space-y-8 p-2">
          {/* Root node */}
          <div className="flex flex-col items-center">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg shadow-primary/20">
              {knowledgeData.root}
            </div>
            <div className="w-px h-8 bg-gray-200 mx-auto mt-2" />
          </div>

          {/* Branches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {knowledgeData.branches.map((branch) => {
              const branchNodesUnlocked = branch.nodes.filter(n => userUnlockedNodes.includes(n.id)).length;
              const branchProgress = Math.round((branchNodesUnlocked / branch.nodes.length) * 100);

              return (
                <div key={branch.id} className="flex flex-col items-center">
                  {/* Branch header */}
                  <div className="relative flex flex-col items-center w-full">
                    <h3 className="text-base font-bold text-deep mb-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 z-10 text-center">
                      {branch.name}
                    </h3>
                    <div className="text-xs font-bold text-primary mb-4 bg-primary/10 px-2 py-0.5 rounded z-10">
                      {branchProgress}% Completo
                    </div>
                    {/* Vertical connector from header to nodes */}
                    <div className="w-px h-4 bg-gray-200 -mt-3 mb-0" />
                  </div>

                  {/* Nodes */}
                  <div className="flex flex-col gap-4 w-full">
                    {branch.nodes.map((node, nodeIdx) => {
                      const isUnlocked = userUnlockedNodes.includes(node.id);
                      const isCompleted = isUnlocked; // Now depends strictly on gamification engine
                      const isLocked = !isCompleted;
                      const unlockRule = getUnlockRule(node.id);

                      return (
                        <div key={node.id} className="flex flex-col items-center group relative">
                          {/* Connector dot between nodes */}
                          {nodeIdx > 0 && (
                            <div className={`w-px h-4 ${isCompleted ? 'bg-primary/40' : 'bg-gray-200'} mb-0`} />
                          )}
                          
                          <motion.div
                            whileHover={!isLocked ? { scale: 1.03 } : {}}
                            whileTap={!isLocked ? { scale: 0.97 } : {}}
                            onClick={() => !isLocked && setSelectedNode(node)}
                            className={`relative w-full p-4 rounded-xl shadow-sm border flex flex-col items-center text-center transition-all ${
                              isCompleted
                                ? 'bg-primary border-primary text-white shadow-primary/30 shadow-md cursor-pointer'
                                : 'bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed'
                            }`}
                          >
                            {isLocked && <Lock size={14} className="absolute top-2 right-2 text-gray-400 opacity-60" />}
                            <div className={`font-bold text-sm leading-tight ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                              {node.name}
                            </div>
                            <div className={`text-[10px] mt-1 font-semibold uppercase tracking-wider ${isCompleted ? 'text-white/70' : 'text-gray-400'}`}>
                              {isCompleted ? 'Completado' : 'Bloqueado'}
                            </div>
                          </motion.div>

                          {/* Tooltip for locked nodes */}
                          {isLocked && unlockRule && (
                            <div className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-48 p-2 bg-gray-800 text-white text-[11px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none shadow-xl border border-gray-700">
                              <div className="flex items-center gap-1 mb-1 text-gray-300 font-bold uppercase tracking-wider">
                                <Info size={10} /> Cómo desbloquear
                              </div>
                              {unlockRule.hint}
                              <div className="absolute top-1/2 -translate-y-1/2 right-full border-4 border-transparent border-r-gray-800" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-6"
          >
            <button onClick={() => setSelectedNode(null)} className="self-start text-sm font-semibold text-primary hover:underline flex items-center gap-1 mb-2">
              ← Volver al árbol
            </button>
            
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
              <h3 className="text-2xl font-bold text-deep mb-2">{selectedNode.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{selectedResource?.description ?? 'Competencia desarrollada durante el CEIISE 2026. Esta habilidad es fundamental para destacar en entornos industriales modernos.'}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Info size={12} /> Desbloqueado mediante actividades
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-deep text-sm mb-3 uppercase tracking-wider">Materiales de la sesión</h4>
                <a
                  href={selectedResource?.recording.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                      <Play size={18} className="ml-1" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-deep text-sm">{selectedResource?.recording.label ?? 'Grabación de Ponencia'}</div>
                      <div className="text-xs text-gray-500">{selectedResource ? `${selectedResource.recording.duration} • ${selectedResource.recording.quality}` : '45 min • 1080p'}</div>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-primary transition-colors text-sm font-medium">Ver →</div>
                </a>

                <a
                  href={selectedResource?.presentation.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-deep text-sm">{selectedResource?.presentation.label ?? 'Presentación PDF'}</div>
                      <div className="text-xs text-gray-500">{selectedResource?.presentation.format ?? 'PDF'}</div>
                    </div>
                  </div>
                  <Download size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      )}

    </Modal>
  );
};
