import React from 'react';
import { Award, User, Target, Crown } from 'lucide-react';

interface UserData {
  name: string;
  ticketType: string;
  level: number;
}

interface DashboardProps {
  user: UserData;
  onOpenProfile: () => void;
  onOpenKnowledgeTree: () => void;
  onOpenPassport: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onOpenProfile, onOpenKnowledgeTree, onOpenPassport }) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-30 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-deep tracking-tight">Bienvenido, {user.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                <Crown size={14} className="text-primary" />
                <span className="font-semibold text-primary">{user.ticketType} PASS</span>
                <span className="text-gray-300">•</span>
                <span className="font-medium">Nivel {user.level}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button onClick={onOpenProfile} className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white/50 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all text-sm font-semibold border border-gray-100/50 hover:border-primary/20 text-deep">
              <User size={16} className="text-primary/70" /> Perfil
            </button>
            <button onClick={onOpenPassport} className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white/50 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all text-sm font-semibold border border-gray-100/50 hover:border-primary/20 text-deep">
              <Target size={16} className="text-primary/70" /> Premios
            </button>
            <button onClick={onOpenKnowledgeTree} className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full shadow-[0_8px_16px_-6px_rgba(132,12,215,0.4)] transition-all duration-300 text-sm font-bold ${user.ticketType === 'STANDARD' ? 'bg-gray-400 text-white' : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_12px_20px_-6px_rgba(132,12,215,0.6)] hover:-translate-y-0.5'}`}>
              <Award size={16} /> Mis nuevas habilidades
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
