import React, { useState } from 'react';
import { Modal } from '../UI/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Play, FileText, Download, ChevronRight } from 'lucide-react';
import knowledgeData from '../../data/knowledge.json';

interface KnowledgeTreeProps {
  isOpen: boolean;
  onClose: () => void;
  userUnlockedNodes: string[];
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({ isOpen, onClose, userUnlockedNodes }) => {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Árbol del Desarrollo Profesional">
      
      {!selectedNode ? (
        <div className="space-y-8 p-4">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg shadow-primary/20">
              {knowledgeData.root}
            </div>
            <div className="w-px h-8 bg-gray-200 mx-auto my-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {knowledgeData.branches.map((branch) => (
              <div key={branch.id} className="relative flex flex-col items-center">
                <h3 className="text-lg font-bold text-deep mb-6 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 z-10">{branch.name}</h3>
                
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-[calc(100%-2rem)] bg-gray-200 -z-10" />

                <div className="flex flex-col gap-6 w-full px-2">
                  {branch.nodes.map((node) => {
                    const isUnlocked = userUnlockedNodes.includes(node.id);
                    const isCompleted = node.status === 'completed' || isUnlocked;
                    const isLocked = !isUnlocked;
                    
                    return (
                      <motion.div 
                        key={node.id}
                        whileHover={!isLocked ? { scale: 1.05 } : {}}
                        whileTap={!isLocked ? { scale: 0.95 } : {}}
                        onClick={() => !isLocked && setSelectedNode(node)}
                        className={`relative p-4 rounded-xl shadow-sm border flex flex-col items-center text-center cursor-pointer transition-all ${
                          isCompleted ? 'bg-primary border-primary text-white shadow-primary/30 shadow-md' :
                          'bg-gray-50 border-gray-200 opacity-60 grayscale'
                        }`}
                      >
                        {isLocked && <Lock size={16} className="absolute top-2 right-2 opacity-50" />}
                        <div className={`font-bold text-sm leading-tight ${isCompleted ? 'text-white' : 'text-gray-500'}`}>{node.name}</div>
                        <div className={`text-[10px] mt-1.5 font-bold uppercase tracking-wider ${isCompleted ? 'text-white/80' : 'text-gray-400'}`}>+{node.points} XP</div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
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
              <p className="text-gray-600 mb-4 text-sm">Competencia desarrollada durante el CEIISE 2026. Esta habilidad es fundamental para destacar en entornos industriales modernos.</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white border border-gray-200 text-xs font-bold rounded-full text-gray-500">
                  +{selectedNode.points} XP Obtenida
                </span>
                <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  Completado
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-deep text-sm mb-3 uppercase tracking-wider">Materiales de la sesión</h4>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/40 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                      <Play size={18} className="ml-1" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-deep text-sm">Grabación de Ponencia</div>
                      <div className="text-xs text-gray-500">45 min • 1080p</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/40 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-deep text-sm">Presentación PDF</div>
                      <div className="text-xs text-gray-500">2.4 MB</div>
                    </div>
                  </div>
                  <Download size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      )}

    </Modal>
  );
};
