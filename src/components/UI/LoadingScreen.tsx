import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/iconoceiiseweb.svg';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(132,12,215,0.12),_transparent_60%)] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <motion.img
          src={logo}
          alt="CEIISE"
          className="h-20 w-20 rounded-3xl shadow-lg object-contain"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <h1 className="mt-6 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-deep via-primary to-secondary">
          CEIISE 2026
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-500">Cargando tu progreso...</p>
        <div className="mt-6 h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </motion.div>
    </div>
  );
};
