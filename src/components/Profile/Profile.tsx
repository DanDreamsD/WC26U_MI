import React from 'react';
import { Modal } from '../UI/Modal';
import { Crown, Award, LogOut } from 'lucide-react';
import badgesData from '../../data/badges.json';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: any;
}

export const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, onLogout, user }) => {
  const userBadges = badgesData.filter(b => user.badges.includes(b.id));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Perfil del Participante">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-primary/20 mb-4">
          {user.name.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold text-deep">{user.name}</h2>
        <p className="text-gray-500">{user.career} • {user.university}</p>
        
        <div className="mt-4 px-4 py-1.5 bg-primary/10 rounded-full flex items-center gap-2 border border-primary/20">
          <Crown size={16} className="text-primary" />
          <span className="font-bold text-primary text-sm">{user.ticketType} PASS</span>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white px-8 py-4 rounded-xl border border-gray-100 shadow-sm text-center">
          <div className="text-gray-500 text-sm mb-1">Nivel Actual</div>
          <div className="text-2xl font-bold text-deep">{user.level}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-deep mb-4 flex items-center gap-2">
          <Award size={20} className="text-primary" /> Insignias Obtenidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userBadges.map(badge => (
            <div key={badge.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-primary" />
              </div>
              <div>
                <div className="font-bold text-deep text-sm">{badge.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{badge.description}</div>
                <div className="text-[10px] font-semibold text-primary mt-1 uppercase">{badge.rarity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <button
          onClick={() => { onClose(); onLogout(); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 hover:border-red-300 transition-all"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </Modal>
  );
};
