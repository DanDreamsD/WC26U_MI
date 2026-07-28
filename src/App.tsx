import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Crown } from 'lucide-react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LevelJourney } from './components/Journey/LevelJourney';
import { LevelModal } from './components/Journey/LevelModal';
import { Profile } from './components/Profile/Profile';
import { Prizes } from './components/Prizes/Prizes';
import { KnowledgeTree } from './components/Tree/KnowledgeTree';
import { LoginScreen } from './components/Auth/LoginScreen';
import { Modal } from './components/UI/Modal';
import { XpNotification } from './components/UI/XpNotification';
import { LevelUpCelebration } from './components/UI/LevelUpCelebration';
import { DevPanel } from './components/DevPanel/DevPanel';
import { TESTER_DOCUMENT_ID, type AppUser } from './utils/users';
import {
  loadProgress,
  saveProgress,
  type UserProgress,
  type GamificationEvent,
} from './utils/gamificationStore';
import { syncProgressToSheets, loadProgressFromSheets } from './utils/sheetsSync';

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [prizesOpen, setPrizesOpen] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  const [restrictionOpen, setRestrictionOpen] = useState(false);
  const [restrictionTitle, setRestrictionTitle] = useState('Acceso limitado');
  const [pendingEvents, setPendingEvents] = useState<GamificationEvent[]>([]);
  const clearPendingEvents = useCallback(() => setPendingEvents([]), []);
  
  const [selectedLevel, setSelectedLevel] = useState<any | null>(null);
  const [levelUpCelebration, setLevelUpCelebration] = useState<{ level: number; title: string } | null>(null);

  // ── Load gamification progress when user logs in ──────────────
  useEffect(() => {
    if (user) {
      const loaded = loadProgress(user.documentId);
      setProgress(loaded);

      if (user.documentId !== TESTER_DOCUMENT_ID) {
        loadProgressFromSheets(user.documentId).then((sheetsProgress) => {
          if (sheetsProgress) {
            setProgress(sheetsProgress);
          }
        });
      }
    } else {
      setProgress(null);
    }
  }, [user]);

  // ── Progress update callback ──────────────────────────────────
  const handleProgressUpdate = useCallback(
    (updatedProgress: UserProgress, events: GamificationEvent[]) => {
      setProgress({ ...updatedProgress });
      saveProgress(updatedProgress);
      syncProgressToSheets(updatedProgress);

      if (events.length > 0) {
        // Deduplicate events by type+label+value to avoid showing the same notification twice
        setPendingEvents((prev) => {
          const seen = new Set(prev.map((e) => `${e.type}|${e.label}|${e.value ?? ''}`));
          const unique = events.filter((e) => {
            const key = `${e.type}|${e.label}|${e.value ?? ''}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          return [...prev, ...unique];
        });

        // Check for level-up events to trigger celebration
        const levelUpEvent = events.find((e) => e.type === 'level-up');
        if (levelUpEvent && levelUpEvent.value) {
          setLevelUpCelebration({ level: levelUpEvent.value, title: levelUpEvent.label });
        }
      }

      // Sync user-level fields for display
      if (user) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                xp: updatedProgress.xp,
                level: updatedProgress.level,
                unlockedNodes: [...updatedProgress.unlockedNodes],
                badges: [...updatedProgress.earnedBadges],
                completedMissions: [...updatedProgress.quizzesCompleted.map((d) => `quiz-d${d}`)],
              }
            : prev
        );
      }
    },
    [user]
  );

  const handleRestrictedAccess = (featureName: string) => {
    setRestrictionTitle(featureName);
    setRestrictionOpen(true);
  };

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <div className="h-screen bg-white flex flex-col relative overflow-x-hidden font-sans selection:bg-primary selection:text-white">
      {/* Premium subtle mesh gradient background */}
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none" />

      <Dashboard 
        user={user}
        progress={progress}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenPassport={() => setPrizesOpen(true)}
        onOpenKnowledgeTree={() => (user.ticketType === 'STANDARD' ? handleRestrictedAccess('Mis nuevas habilidades') : setTreeOpen(true))}
      />

      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col items-center">
        <div className="mt-12 text-center w-full max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase"
          >
            CEIISE 2026
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-deep via-primary to-secondary mb-4 tracking-tight"
          >
            Tu Ruta de Progreso
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-lg max-w-lg mx-auto mb-12"
          >
            Desbloquea conocimientos, completa retos y construye tu perfil profesional día a día.
          </motion.p>
          
          <LevelJourney isReviewer={user.documentId === TESTER_DOCUMENT_ID} onNodeClick={(level) => setSelectedLevel(level)} />
        </div>
      </main>

      <LevelModal 
        isOpen={!!selectedLevel} 
        onClose={() => setSelectedLevel(null)} 
        level={selectedLevel} 
        userTicket={user.ticketType} 
        documentId={user.documentId} 
        isReviewer={user.documentId === TESTER_DOCUMENT_ID}
        progress={progress}
        onProgressUpdate={handleProgressUpdate}
      />

      <Profile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onLogout={() => setUser(null)}
        user={user}
        progress={progress}
      />
      <Prizes
        isOpen={prizesOpen}
        onClose={() => setPrizesOpen(false)}
        user={user}
        progress={progress}
        onProgressUpdate={handleProgressUpdate}
      />
      {user.ticketType !== 'STANDARD' && (
        <KnowledgeTree
          isOpen={treeOpen}
          onClose={() => setTreeOpen(false)}
          progress={progress}
        />
      )}

      <Modal isOpen={restrictionOpen} onClose={() => setRestrictionOpen(false)} title="Acceso limitado">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock size={28} />
          </div>
          <h3 className="text-xl font-bold text-deep">{restrictionTitle}</h3>
          <p className="mt-2 max-w-md text-sm text-gray-600">
            Los participantes Standard pueden ver el recorrido general, pero para acceder a los detalles completos y a Mis nuevas habilidades necesitan un plan superior.
          </p>
          <div className="mt-5 flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
            <Crown size={16} />
            Disponible en Premium o VIP
          </div>
        </div>
      </Modal>

      {/* Gamification event notifications */}
      <XpNotification
        events={pendingEvents}
        onClear={clearPendingEvents}
      />

      {/* Level-up celebration */}
      <LevelUpCelebration
        isOpen={!!levelUpCelebration}
        onClose={() => setLevelUpCelebration(null)}
        level={levelUpCelebration?.level ?? 1}
        levelTitle={levelUpCelebration?.title ?? ''}
        userName={user.name}
      />

      {/* Dev panel - tester only */}
      {user.documentId === TESTER_DOCUMENT_ID && (
        <DevPanel progress={progress} onProgressUpdate={handleProgressUpdate} />
      )}
      
    </div>
  );
}

export default App;
