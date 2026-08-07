import React from 'react';
import { Modal } from '../UI/Modal';
import { Mic, Wrench, User, CheckCircle2, Sparkles, CalendarDays, Lightbulb, Hourglass, Briefcase } from 'lucide-react';
import type { DaySummary, DaySummaryConcept, DaySummarySession, DaySessionType } from '../../data/daySummaries';

interface DaySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayId: number;
  summary: DaySummary | null;
}

const typeBadge = (type: DaySessionType) => {
  switch (type) {
    case 'PONENCIA':
      return { label: 'Ponencia', classes: 'bg-primary/10 text-primary', Icon: Mic };
    case 'TALLER':
      return { label: 'Taller', classes: 'bg-amber-500/15 text-amber-700', Icon: Wrench };
    case 'BUSINESS CASE':
      return { label: 'Business Case', classes: 'bg-rose-500/10 text-rose-600', Icon: Briefcase };
  }
};

const ACCENTS = [
  { text: 'text-primary', dot: 'bg-primary', headerBorder: 'border-primary/15' },
  { text: 'text-amber-600', dot: 'bg-amber-500', headerBorder: 'border-gray-100' },
  { text: 'text-sky-600', dot: 'bg-sky-500', headerBorder: 'border-gray-100' },
  { text: 'text-emerald-600', dot: 'bg-emerald-500', headerBorder: 'border-gray-100' },
];

const ConceptBlock: React.FC<{ concept: DaySummaryConcept; accent: (typeof ACCENTS)[number] }> = ({ concept, accent }) => (
  <div className="flex gap-3">
    <div className="flex flex-col items-center pt-1.5">
      <div className={`shrink-0 w-2 h-2 rounded-full ${accent.dot}`} />
      <div className="flex-1 w-px bg-gray-200 mt-1.5" />
    </div>
    <div className="flex-1 pb-1">
      <h5 className="text-sm font-extrabold text-deep flex items-center gap-1.5">
        <Lightbulb size={13} className={accent.text} />
        {concept.title}
      </h5>
      <ul className="mt-1.5 space-y-1.5">
        {concept.points.map((point, index) => (
          <li key={index} className="flex items-start gap-1.5 text-sm text-gray-600 leading-relaxed">
            {concept.points.length > 1 ? (
              <CheckCircle2 size={13} className="mt-1 shrink-0 text-green-600" />
            ) : (
              <span className={`mt-2 w-1.5 h-1.5 shrink-0 rounded-full ${accent.dot}`} />
            )}
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SessionCard: React.FC<{ session: DaySummarySession; index: number }> = ({ session, index }) => {
  const badge = typeBadge(session.type);
  const accent = ACCENTS[index % ACCENTS.length];
  const BadgeIcon = badge.Icon;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className={`p-5 border-b ${accent.headerBorder}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${badge.classes}`}>
            <BadgeIcon size={12} />
            {badge.label}
          </span>
          <span className="text-[10px] font-semibold text-gray-400">Sesión {index + 1}</span>
        </div>
        <h4 className={`text-lg font-extrabold leading-snug ${accent.text}`}>{session.title}</h4>
        <p className="mt-1.5 flex items-start gap-1.5 text-sm text-gray-600 italic">
          <User size={14} className={`mt-0.5 shrink-0 ${accent.text}`} />
          {session.speaker}
        </p>
      </div>
      <div className="p-5 space-y-4 bg-gray-50/60">
        {session.concepts.map((concept, conceptIndex) => (
          <ConceptBlock key={conceptIndex} concept={concept} accent={accent} />
        ))}
      </div>
    </div>
  );
};

export const DaySummaryModal: React.FC<DaySummaryModalProps> = ({ isOpen, onClose, dayId, summary }) => {
  const title = summary ? `Resumen del Día ${summary.dayId}` : `Resumen del Día ${dayId}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {!summary ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <Hourglass size={28} />
          </div>
          <h4 className="text-lg font-bold text-deep">Resumen en preparación</h4>
          <p className="mt-2 max-w-sm text-sm text-gray-600">
            El resumen del día {dayId} estará disponible próximamente. Vuelve a revisar más adelante.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
        <div className="rounded-2xl bg-gradient-to-br from-deep via-dark to-primary p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-6 w-44 h-44 rounded-full bg-white/5" />
          <div className="relative">
            <div className="flex items-center gap-2 text-primary-100">
              <Sparkles size={14} className="text-amber-300" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Resumen Ejecutivo</span>
            </div>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight">
              Día {summary.dayId}
            </h3>
            <p className="mt-1 text-lg font-semibold text-white/95">{summary.title}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <CalendarDays size={13} className="text-amber-300" />
              {summary.subtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <Lightbulb size={16} className="shrink-0 text-amber-600" />
          <span>
            Lo más importante de las <strong>{summary.sessions.length} sesiones</strong> del día, conceptos clave resumidos para ti.
          </span>
        </div>

        {summary.sessions.map((session, index) => {
          const prevBlock = index > 0 ? summary.sessions[index - 1].block : undefined;
          return (
            <div key={index} className="space-y-5">
              {session.block && session.block !== prevBlock && (
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary/80">{session.block}</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
                </div>
              )}
              <SessionCard session={session} index={index} />
            </div>
          );
        })}
        </div>
      )}
    </Modal>
  );
};
