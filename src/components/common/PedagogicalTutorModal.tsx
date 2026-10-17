import React, { useState } from 'react';
import { askTutor, TutorResponse, FinanceDomain } from '../../core/ai/tutor';
import {
  Sparkles,
  X,
  Send,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  responseDetails?: TutorResponse;
}

const PRESET_QUESTIONS = [
  "Pourquoi mon résultat est positif alors que je n'ai plus de trésorerie ?",
  "Comment interpréter la relation entre FRNG, BFR et Trésorerie Nette ?",
  "Quand doit-on préférer la VAN au TRI selon le taux de Fisher ?",
  "Puis-je utiliser les primes d'assurance encaissées selon l'article 13 CIMA ?",
  "Comment fonctionne la réserve de conversion selon IAS 21 ?",
];

export const PedagogicalTutorModal: React.FC<{ activeDomain?: FinanceDomain }> = ({
  activeDomain = 'accounting_syscohada',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: "Bonjour ! Je suis votre Tuteur Pédagogique Intelligent. Je vous guide selon les normes SYSCOHADA Révisé, le Code CIMA et les standards financiers internationaux. Posez-moi vos questions ou cliquez sur un thème ci-dessous.",
    },
  ]);

  const handleAsk = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
    };

    const tutorResult = askTutor(queryText, activeDomain);

    const tutorMsg: ChatMessage = {
      id: `t-${Date.now()}`,
      sender: 'tutor',
      text: tutorResult.socraticGuidance,
      responseDetails: tutorResult,
    };

    setMessages((prev) => [...prev, userMsg, tutorMsg]);
    setInputValue('');
  };

  return (
    <>
      {/* Bouton Flottant Déclencheur */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-800 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition transform hover:scale-105 border border-indigo-300/40 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
        title="Ouvrir le Tuteur Pédagogique Intelligent"
      >
        <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        <span className="font-extrabold text-xs tracking-wide hidden sm:inline">
          Tuteur IA Socratique
        </span>
      </button>

      {/* Modal / Tiroir Flottant */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideInRight">
            {/* En-tête Tiroir */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight text-white">
                    Tuteur IA Socratique & Garde-fous
                  </h3>
                  <p className="text-[11px] text-indigo-200">
                    Conformité SYSCOHADA • Code CIMA • IFRS
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions fréquentes suggérées */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(q)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/60 text-slate-700 hover:text-indigo-900 rounded-lg text-[11px] font-medium whitespace-nowrap transition flex items-center gap-1 shadow-2xs"
                >
                  <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{q.slice(0, 38)}...</span>
                </button>
              ))}
            </div>

            {/* Flux de Conversation */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/80'
                    }`}
                  >
                    {/* Badge de Concept et Référence */}
                    {msg.responseDetails && msg.responseDetails.matchedConcept && (
                      <div className="mb-2 pb-2 border-b border-slate-200 flex flex-wrap gap-1.5 items-center">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                          {msg.responseDetails.matchedConcept}
                        </span>
                        {msg.responseDetails.standardReference && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-[10px]">
                            {msg.responseDetails.standardReference}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Alerte Piège / Idée Reçue */}
                    {msg.responseDetails?.identifiedMisconception && (
                      <div className="mb-2.5 p-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-[11px] flex items-start gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Piège cognitif détecté :</strong>{' '}
                          {msg.responseDetails.identifiedMisconception}
                        </div>
                      </div>
                    )}

                    {/* Corps du message */}
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Formule officielle */}
                    {msg.responseDetails?.formula && (
                      <div className="mt-2.5 p-2 bg-white rounded-xl border border-slate-200 text-slate-900 font-mono text-[11px]">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5 font-sans">
                          Formule Officielle :
                        </span>
                        {msg.responseDetails.formula}
                      </div>
                    )}

                    {/* Action suggérée */}
                    {msg.responseDetails?.suggestedAction && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-indigo-700 font-medium flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 text-indigo-600 shrink-0" />
                        <span>{msg.responseDetails.suggestedAction}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Formulaire de saisie */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk(inputValue);
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question (ex: BFR, CIMA, VAN vs TRI...)"
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
