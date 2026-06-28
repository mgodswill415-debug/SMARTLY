'use client';

import { motion } from 'framer-motion';
import { Zap, Brain, Trophy } from 'lucide-react';

interface LandingScreenProps {
  onStartLearning: () => void;
}

export default function LandingScreen({ onStartLearning }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-smartly-navy flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-smartly-purple/30 particle"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center mb-8"
      >
        <div className="glow-pulse rounded-2xl p-1 mb-6">
          <img
            src="/smartly-logo.png"
            alt="Smartly Logo"
            className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold text-white text-center mb-3"
        >
          Study Smarter.{' '}
          <span className="bg-gradient-to-r from-smartly-purple to-smartly-purple-light bg-clip-text text-transparent">
            Not Harder.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-smartly-text-dim text-center max-w-md text-sm sm:text-base"
        >
          AI explains any topic using your hobbies — anime, gaming, football, music.
        </motion.p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-12"
      >
        <button
          onClick={onStartLearning}
          className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-semibold text-base hover:opacity-90 transition-opacity cursor-pointer"
        >
          Start Learning
        </button>
        <button
          onClick={onStartLearning}
          className="flex-1 py-3 px-6 rounded-xl border border-smartly-purple/30 text-smartly-purple-light font-semibold text-base hover:bg-smartly-purple/10 transition-colors cursor-pointer"
        >
          See How It Works
        </button>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
      >
        {[
          { icon: Brain, title: 'Personalized Analogies', desc: 'We speak your language — gaming, anime, sports' },
          { icon: Trophy, title: 'Career Connections', desc: 'Every topic linked to your dream career' },
          { icon: Zap, title: 'Rapid Quizzes', desc: 'Test yourself instantly with AI-generated questions' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            className="bg-smartly-surface/50 border border-smartly-purple/10 rounded-2xl p-5 flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-smartly-purple/20 flex items-center justify-center mb-3">
              <feature.icon className="w-5 h-5 text-smartly-purple-light" />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-smartly-text-dim text-xs">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 text-smartly-text-dim text-xs"
      >
        Built for WAEC, JAMB, and beyond.
      </motion.p>
    </div>
  );
}
