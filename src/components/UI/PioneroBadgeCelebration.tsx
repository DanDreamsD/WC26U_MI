import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playPioneroFanfare } from '../../utils/sounds';

interface PioneroBadgeProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

// ── Firework particle system ──────────────────────────────────

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  gravity: number;
  decay: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
}

const COLORS = [
  '#840CD7', '#6105A3', '#FF6B6B', '#FFD93D', '#6BCB77',
  '#4D96FF', '#FF9A8B', '#FF6FD8', '#3CD4A0', '#FFE66D',
  '#A78BFA', '#F472B6', '#FCD34D', '#34D399', '#60A5FA',
];

const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const PioneroBadgeCelebration: React.FC<PioneroBadgeProps> = ({ isOpen, onClose, userName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animFrameRef = useRef<number>(0);
  const particleIdRef = useRef(0);
  const [showContent, setShowContent] = useState(false);

  const createExplosion = useCallback((x: number, y: number, color: string) => {
    const count = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 2 + Math.random() * 5;
      particlesRef.current.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.3 ? color : randomColor(),
        size: 2 + Math.random() * 3,
        life: 1,
        maxLife: 60 + Math.random() * 40,
        gravity: 0.03,
        decay: 0.012 + Math.random() * 0.008,
      });
    }
  }, []);

  const launchRocket = useCallback((canvas: HTMLCanvasElement) => {
    const x = canvas.width * 0.15 + Math.random() * canvas.width * 0.7;
    rocketsRef.current.push({
      x,
      y: canvas.height,
      targetY: canvas.height * 0.15 + Math.random() * canvas.height * 0.35,
      vy: -8 - Math.random() * 4,
      color: randomColor(),
      exploded: false,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setShowContent(false);
      return;
    }

    playPioneroFanfare();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = [];
    rocketsRef.current = [];

    // Launch initial burst of rockets
    for (let i = 0; i < 5; i++) {
      setTimeout(() => launchRocket(canvas), i * 200);
    }

    // Continue launching rockets periodically
    const launchInterval = setInterval(() => {
      if (canvas) launchRocket(canvas);
    }, 600);

    // Show badge content after a moment
    setTimeout(() => setShowContent(true), 800);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update rockets
      rocketsRef.current = rocketsRef.current.filter((rocket) => {
        if (rocket.exploded) return false;

        rocket.y += rocket.vy;

        // Draw rocket trail
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = rocket.color;
        ctx.fill();

        // Trail sparkles
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            id: particleIdRef.current++,
            x: rocket.x + (Math.random() - 0.5) * 4,
            y: rocket.y + Math.random() * 8,
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 2,
            color: rocket.color,
            size: 1 + Math.random(),
            life: 1,
            maxLife: 15,
            gravity: 0.01,
            decay: 0.06,
          });
        }

        if (rocket.y <= rocket.targetY) {
          createExplosion(rocket.x, rocket.y, rocket.color);
          rocket.exploded = true;
        }

        return true;
      });

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.life -= p.decay;

        if (p.life <= 0) return false;

        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(launchInterval);
      window.removeEventListener('resize', resize);
    };
  }, [isOpen, createExplosion, launchRocket]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Fireworks canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'transparent' }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          {/* Badge content */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative z-10 flex flex-col items-center text-center max-w-md mx-4"
              >
                {/* Glowing badge container */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(132, 12, 215, 0.3), 0 0 60px rgba(132, 12, 215, 0.1)',
                      '0 0 50px rgba(132, 12, 215, 0.5), 0 0 100px rgba(132, 12, 215, 0.2)',
                      '0 0 30px rgba(132, 12, 215, 0.3), 0 0 60px rgba(132, 12, 215, 0.1)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center mb-6 border-4 border-white/30"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-7xl"
                  >
                    🏅
                  </motion.div>
                </motion.div>

                {/* Badge title with shimmer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="inline-block px-4 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-[0.25em] mb-3">
                    Insignia Exclusiva
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
                    Pionero <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">CEIISE</span>
                  </h2>
                  <p className="text-white/60 text-sm max-w-sm mb-2">
                    Por ser uno de los participantes del CEIISE 2026, has recibido esta insignia exclusiva que te reconoce como pionero del congreso.
                  </p>
                  <p className="text-amber-400 text-sm font-bold mb-6">
                    ¡Felicidades, {userName}!
                  </p>
                </motion.div>

                {/* Claim button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold rounded-full shadow-[0_10px_40px_-10px_rgba(251,191,36,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(251,191,36,0.7)] transition-shadow text-sm uppercase tracking-wider"
                >
                  ¡Reclamar Insignia!
                </motion.button>

                {/* Floating sparkles around the badge */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                    className="absolute text-lg pointer-events-none"
                    style={{
                      left: `${15 + (i * 10)}%`,
                      top: `${10 + Math.random() * 30}%`,
                    }}
                  >
                    ✦
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
