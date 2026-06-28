'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, User, ArrowRight, LogIn, UserPlus, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (result: { id: string; name: string; email: string; whatsapp: string; token: string; isNew: boolean; hasProfile?: boolean; profile?: { name: string; interests: string[]; career: string } }) => void;
  onBack: () => void;
}

export default function AuthScreen({ onAuthSuccess, onBack }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    if (mode === 'signup' && !name.trim()) { setError('Please enter your name'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email'); return; }
    if (!password || password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (mode === 'signup' && !whatsapp.trim()) { setError('Please enter your WhatsApp number'); return; }
    setLoading(true);
    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const body = mode === 'signup'
        ? { name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim(), password }
        : { email: email.trim(), password };
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return; }
      onAuthSuccess({ id: data.user.id, name: data.user.name, email: data.user.email, whatsapp: data.user.whatsapp, token: data.token, isNew: data.isNew ?? false, hasProfile: data.hasProfile ?? false, profile: data.profile });
    } catch { setError('Network error. Check your connection.'); } finally { setLoading(false); }
  };

  const formatWhatsApp = (value: string) => { setWhatsapp(value.replace(/[^\d+\-\s]/g, '')); };

  return (
    <div className="min-h-screen bg-smartly-navy flex flex-col px-6 py-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-smartly-purple/20 particle" style={{ left: `${20 + i * 20}%`, top: `${15 + (i % 3) * 25}%`, animationDelay: `${i * 1.2}s`, animationDuration: `${6 + i * 0.8}s` }} />
        ))}
      </div>

      <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={onBack} className="w-10 h-10 rounded-xl bg-smartly-surface/50 border border-smartly-purple/10 flex items-center justify-center hover:bg-smartly-surface transition-colors cursor-pointer mb-6 self-start">
        <ArrowRight className="w-5 h-5 text-white rotate-180" />
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="flex flex-col items-center mb-6">
        <div className="glow-pulse rounded-2xl p-1 mb-3">
          <img src="/smartly-icon.png" alt="Smartly" className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">SMARTLY</h1>
        <p className="text-smartly-purple-light text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mt-1">AI STUDY SYSTEM</p>
        <p className="text-zinc-500 text-sm text-center mt-3">{mode === 'signup' ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex bg-smartly-surface/50 rounded-xl p-1 mb-6 max-w-sm mx-auto w-full">
        <button onClick={() => { setMode('signup'); setError(''); }} className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${mode === 'signup' ? 'bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white shadow-lg shadow-smartly-purple/30' : 'text-smartly-text-dim hover:text-white'}`}><UserPlus className="w-4 h-4" /> Sign Up</button>
        <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${mode === 'login' ? 'bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white shadow-lg shadow-smartly-purple/30' : 'text-smartly-text-dim hover:text-white'}`}><LogIn className="w-4 h-4" /> Log In</button>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, x: mode === 'signup' ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: mode === 'signup' ? -30 : 30 }} transition={{ duration: 0.25 }} className="flex-1 flex flex-col max-w-sm mx-auto w-full">
          {mode === 'signup' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-smartly-text-dim" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full pl-12 pr-4 py-4 rounded-xl bg-smartly-surface/50 border border-smartly-purple/20 text-white placeholder:text-smartly-text-dim/50 focus:outline-none focus:border-smartly-purple/60 focus:ring-2 focus:ring-smartly-purple/20 transition-all text-base" onKeyDown={(e) => e.key === 'Enter' && handleAuth()} />
              </div>
            </motion.div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-smartly-text-dim" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-12 pr-4 py-4 rounded-xl bg-smartly-surface/50 border border-smartly-purple/20 text-white placeholder:text-smartly-text-dim/50 focus:outline-none focus:border-smartly-purple/60 focus:ring-2 focus:ring-smartly-purple/20 transition-all text-base" onKeyDown={(e) => e.key === 'Enter' && handleAuth()} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-smartly-text-dim" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full pl-12 pr-12 py-4 rounded-xl bg-smartly-surface/50 border border-smartly-purple/20 text-white placeholder:text-smartly-text-dim/50 focus:outline-none focus:border-smartly-purple/60 focus:ring-2 focus:ring-smartly-purple/20 transition-all text-base" onKeyDown={(e) => e.key === 'Enter' && handleAuth()} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-smartly-text-dim hover:text-white transition-colors cursor-pointer">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">WhatsApp Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-smartly-text-dim" />
                <input type="tel" value={whatsapp} onChange={(e) => formatWhatsApp(e.target.value)} placeholder="+234 800 000 0000" className="w-full pl-12 pr-14 py-4 rounded-xl bg-smartly-surface/50 border border-smartly-purple/20 text-white placeholder:text-smartly-text-dim/50 focus:outline-none focus:border-smartly-purple/60 focus:ring-2 focus:ring-smartly-purple/20 transition-all text-base" onKeyDown={(e) => e.key === 'Enter' && handleAuth()} />
                <div className="absolute right-4 top-1/2 -translate-y-1/2"><div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center"><span className="text-green-400 text-xs font-bold">WA</span></div></div>
              </div>
            </motion.div>
          )}

          {mode === 'login' && <div className="mb-6" />}

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          <button onClick={handleAuth} disabled={loading || (mode === 'signup' ? !name.trim() || !email.trim() || !password || password.length < 6 || !whatsapp.trim() : !email.trim() || !password)} className="w-full py-4 rounded-xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-semibold text-base hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-smartly-purple/20">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{mode === 'signup' ? 'Create Account' : 'Log In'}<ArrowRight className="w-4 h-4" /></>}
          </button>

          <p className="text-smartly-text-dim text-sm text-center mt-6">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }} className="text-smartly-purple-light font-semibold hover:underline cursor-pointer">{mode === 'signup' ? 'Log In' : 'Sign Up'}</button>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}