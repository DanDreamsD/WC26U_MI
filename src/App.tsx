import { useState } from 'react';
import userData from './data/users.json';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LevelJourney } from './components/Journey/LevelJourney';
import { LevelModal } from './components/Journey/LevelModal';
import { Profile } from './components/Profile/Profile';
import { Passport } from './components/Passport/Passport';
import { KnowledgeTree } from './components/Tree/KnowledgeTree';

function App() {
  const [user] = useState(userData);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passportOpen, setPassportOpen] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  
  const [selectedLevel, setSelectedLevel] = useState<any | null>(null);

  return (
    <div className="h-screen bg-white flex flex-col relative overflow-hidden font-sans selection:bg-primary selection:text-white">
      {/* Premium subtle mesh gradient background */}
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none" />

      <Dashboard 
        user={user}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenPassport={() => setPassportOpen(true)}
        onOpenKnowledgeTree={() => setTreeOpen(true)}
      />

      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col items-center">
        <div className="mt-12 text-center w-full max-w-2xl relative z-10">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
            CEIISE 2026
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-deep via-primary to-secondary mb-4 tracking-tight">
            Tu Ruta de Progreso
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto mb-12">
            Desbloquea conocimientos, completa retos y construye tu perfil profesional día a día.
          </p>
          
          <LevelJourney onNodeClick={(level) => setSelectedLevel(level)} />
        </div>
      </main>

      <LevelModal 
        isOpen={!!selectedLevel} 
        onClose={() => setSelectedLevel(null)} 
        level={selectedLevel} 
        userTicket={user.ticketType} 
      />

      <Profile isOpen={profileOpen} onClose={() => setProfileOpen(false)} user={user} />
      <Passport isOpen={passportOpen} onClose={() => setPassportOpen(false)} user={user} />
      <KnowledgeTree isOpen={treeOpen} onClose={() => setTreeOpen(false)} userUnlockedNodes={user.unlockedNodes} />
      
    </div>
  );
}

export default App;
