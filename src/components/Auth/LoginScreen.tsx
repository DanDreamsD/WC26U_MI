import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { findUserByDocument } from '../../utils/users';
import logo from '../../assets/iconoceiiseweb.svg';

interface LoginScreenProps {
  onLogin: (user: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [documentId, setDocumentId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const user = findUserByDocument(documentId);

    if (!user) {
      setError('No se encontró un participante con ese documento.');
      return;
    }

    setError('');
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(132,12,215,0.12),_transparent_60%)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck size={28} />
            </div>
            <img src={logo} alt="CEIISE" className="h-14 w-14 rounded-2xl shadow-sm object-contain" />
          </div>
          <h1 className="text-2xl font-black text-deep">Acceso a MI PROGRESO - CEIISE 2026</h1>
          <p className="mt-2 text-sm text-gray-500">Ingresa tu documento de identidad para ver tu progreso en CEIISE 2026.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            Documento de identidad
            <input
              type="text"
              value={documentId}
              onChange={(e) => {
                setDocumentId(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ingresa tu documento"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none ring-0 focus:border-primary focus:bg-white"
              autoFocus
            />
          </label>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-secondary"
          >
            Entrar
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Animated border website link */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://ceiise.org"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-primary overflow-hidden group"
            style={{ isolation: 'isolate' }}
          >
            {/* Spinning conic gradient border */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #840CD7, #6105A3, #ffffff, #840CD7)',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            {/* Inner fill */}
            <span className="absolute inset-[2px] rounded-full bg-white z-0" />
            {/* Label */}
            <span className="relative z-10 flex items-center gap-1.5 text-primary group-hover:text-secondary transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Visitar ceiise.org
            </span>
          </a>
        </div>

      </div>
    </div>
  );
};
