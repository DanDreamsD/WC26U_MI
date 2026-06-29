import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { findUserByDocument, loginHint } from '../../utils/users';

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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-black text-deep">Acceso CEIISE 2026</h1>
          <p className="mt-2 text-sm text-gray-500">Ingresa tu documento de identidad para entrar al mapa del evento.</p>
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
              placeholder="Ej. 61327324"
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

        <p className="mt-6 text-center text-xs text-gray-400">{loginHint}</p>
      </div>
    </div>
  );
};
