import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Crown, BellRing, HelpCircle } from 'lucide-react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LevelJourney } from './components/Journey/LevelJourney';
import { LevelModal } from './components/Journey/LevelModal';
import { Profile } from './components/Profile/Profile';
import { Prizes } from './components/Prizes/Prizes';
import { KnowledgeTree } from './components/Tree/KnowledgeTree';
import { LoginScreen } from './components/Auth/LoginScreen';
import { Modal } from './components/UI/Modal';
import { XpNotification } from './components/UI/XpNotification';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { LevelUpCelebration } from './components/UI/LevelUpCelebration';
import { DevPanel } from './components/DevPanel/DevPanel';
import { TESTER_DOCUMENT_ID, type AppUser } from './utils/users';
import {
  loadProgress,
  saveProgress,
  type UserProgress,
  type GamificationEvent,
} from './utils/gamificationStore';

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [prizesOpen, setPrizesOpen] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  const [restrictionOpen, setRestrictionOpen] = useState(false);
  const [restrictionTitle, setRestrictionTitle] = useState('Acceso limitado');
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [pendingEvents, setPendingEvents] = useState<GamificationEvent[]>([]);
  const clearPendingEvents = useCallback(() => setPendingEvents([]), []);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  
  const [selectedLevel, setSelectedLevel] = useState<any | null>(null);
  const [levelUpCelebration, setLevelUpCelebration] = useState<{ level: number; title: string } | null>(null);

  // ── Load gamification progress when user logs in ──────────────
  useEffect(() => {
    if (user) {
      setNoticeOpen(true);
      setIsLoadingProgress(true);
      loadProgress(user.documentId).then((loaded) => {
        setProgress(loaded);
        setIsLoadingProgress(false);
      });
    } else {
      setProgress(null);
      setIsLoadingProgress(false);
    }
  }, [user?.documentId]);

  // ── Progress update callback ──────────────────────────────────
  const handleProgressUpdate = useCallback(
    (updatedProgress: UserProgress, events: GamificationEvent[]) => {
      setProgress({ ...updatedProgress });
      void saveProgress(updatedProgress);

      // Standard users have an informational-only experience: never surface
      // XP, badge or level-up events to them.
      const gamifiedEvents = user?.ticketType === 'ESTANDAR' ? [] : events;

      if (gamifiedEvents.length > 0) {
        // Deduplicate events by type+label+value to avoid showing the same notification twice
        setPendingEvents((prev) => {
          const seen = new Set(prev.map((e) => `${e.type}|${e.label}|${e.value ?? ''}`));
          const unique = gamifiedEvents.filter((e) => {
            const key = `${e.type}|${e.label}|${e.value ?? ''}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          return [...prev, ...unique];
        });

        // Check for level-up events to trigger celebration
        const levelUpEvent = gamifiedEvents.find((e) => e.type === 'level-up');
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

  if (isLoadingProgress || !progress) {
    return <LoadingScreen />;
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
        onOpenKnowledgeTree={() => (user.ticketType === 'ESTANDAR' ? handleRestrictedAccess('Mis nuevas habilidades') : setTreeOpen(true))}
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
      {user.ticketType !== 'ESTANDAR' && (
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

      <Modal isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} title="Aviso importante">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
            <BellRing size={36} />
          </div>
          <h3 className="text-xl font-bold text-deep">Estimado participante</h3>
          <p className="mt-4 max-w-md text-sm text-gray-500">
            ¡Nueva actualización!
          </p>
          <p className="mt-2 max-w-md text-base text-gray-600">
            <span className="font-bold text-deep">Los cuestionarios del Día 2 y el Día 3 ya están activos.</span>
          </p>
          <p className="mt-2 max-w-md text-base text-gray-600">
            Resuélvelos para <span className="font-semibold text-primary">demostrar tus conocimientos</span> y <span className="font-semibold text-primary">sumar puntos a tu perfil</span>.
          </p>
          <button
            onClick={() => setNoticeOpen(false)}
            className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          >
            Entendido
          </button>
        </div>
      </Modal>

      {/* Gamification event notifications */}
      {user.ticketType !== 'ESTANDAR' && (
        <XpNotification
          events={pendingEvents}
          onClear={clearPendingEvents}
        />
      )}

      {/* Level-up celebration */}
      {user.ticketType !== 'ESTANDAR' && (
        <LevelUpCelebration
          isOpen={!!levelUpCelebration}
          onClose={() => setLevelUpCelebration(null)}
          level={levelUpCelebration?.level ?? 1}
          levelTitle={levelUpCelebration?.title ?? ''}
          userName={user.name}
        />
      )}

      {/* Dev panel - tester only */}
      {user.documentId === TESTER_DOCUMENT_ID && (
        <DevPanel progress={progress} onProgressUpdate={handleProgressUpdate} />
      )}

      {/* Help button - subtle corner link */}
      <a
        href="https://forms.gle/eAG8RESu2sYhxhdV6"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-500 shadow-sm hover:text-primary hover:border-primary/30 hover:shadow-md transition-all"
      >
        <HelpCircle size={14} />
        ¿Necesitas ayuda?
      </a>
      
    </div>
  );
}

export default App;
