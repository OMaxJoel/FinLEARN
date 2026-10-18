import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { UserProfile } from '../../types/pedagogy';

interface AccessGateProps {
  onAuthenticated: (profile: UserProfile) => void;
  onUseDemo?: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({ onAuthenticated, onUseDemo }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await fetch(`/api/auth?action=${mode}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Impossible de vous connecter pour le moment.');
      onAuthenticated(payload.profile as UserProfile);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Une erreur est survenue.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4 py-8">
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.05fr_0.95fr] bg-white rounded-[28px] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-900/10">
        <section className="relative overflow-hidden bg-[#0b1733] p-8 sm:p-12 text-white flex flex-col justify-between min-h-[290px]">
          <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
            <div className="absolute -right-12 -top-12 w-72 h-72 rounded-full border border-sky-300/40" />
            <div className="absolute -right-2 top-0 w-52 h-52 rounded-full border border-sky-300/30" />
            <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-500/30 blur-3xl" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-extrabold text-sky-300">FE</div>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-sky-300 font-bold">FinExpert Immersion</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight">Votre prochaine compétence se construit ici.</h1>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-md">Retrouvez vos parcours, vos exercices et votre progression sur chacun de vos appareils.</p>
          </div>
          <p className="relative mt-10 text-xs text-slate-400">Formation finance · SYSCOHADA · UEMOA · CIMA</p>
        </section>

        <section className="p-7 sm:p-12 flex flex-col justify-center">
          <div className="mb-7">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Espace apprenant</span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">{mode === 'login' ? 'Bon retour parmi nous' : 'Créez votre compte'}</h2>
            <p className="mt-2 text-sm text-slate-500">{mode === 'login' ? 'Connectez-vous pour reprendre là où vous en étiez.' : 'Votre progression sera enregistrée dans votre compte.'}</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700">Nom complet</span>
                <span className="relative block">
                  <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input required minLength={2} maxLength={120} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 focus:bg-white" placeholder="Votre nom" />
                </span>
              </label>
            )}
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">Adresse e-mail</span>
              <span className="relative block">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 focus:bg-white" placeholder="vous@exemple.com" />
              </span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">Mot de passe</span>
              <span className="relative block">
                <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input required minLength={10} maxLength={200} type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm text-slate-900 focus:bg-white" placeholder="10 caractères minimum" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-slate-700" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </span>
            </label>

            {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2">
              <span>{busy ? 'Connexion…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>
              {!busy && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            {mode === 'login' ? 'Vous découvrez FinExpert ?' : 'Vous avez déjà un compte ?'}{' '}
            <button onClick={() => { setError(''); setMode((value) => value === 'login' ? 'register' : 'login'); }} className="font-bold text-blue-700 hover:text-blue-900">
              {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
            </button>
          </div>
          {onUseDemo && <button onClick={onUseDemo} className="mt-5 text-xs font-semibold text-slate-400 hover:text-slate-700">Continuer en mode démonstration local</button>}
        </section>
      </div>
    </main>
  );
};
