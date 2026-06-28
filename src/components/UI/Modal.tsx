import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep/40 backdrop-blur-lg"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(42,1,102,0.25)] border border-white/50 flex flex-col"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50 bg-white/40 z-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-deep to-primary">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 bg-gray-100/50 hover:text-white hover:bg-primary rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
