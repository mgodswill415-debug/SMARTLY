'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Gamepad2, Briefcase } from 'lucide-react';
import type { LessonData } from '@/lib/store';

interface LessonScreenProps {
  lessonData: LessonData;
  interest: string;
  career: string;
  onTestMe: () => void;
  onBack: () => void;
}

export default function LessonScreen({
  lessonData,
  interest,
  career,
  onTestMe,
  onBack,
}: LessonScreenProps) {
  const { subject, topic, lesson } = lessonData;

  return (
    <div className="min-h-screen bg-smartly-navy">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-smartly-navy/80 backdrop-blur-lg border-b border-smartly-purple/10 px-4 py-3 flex items-center gap-3"
      >
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-smartly-surface/50 flex items-center justify-center hover:bg-smartly-surface transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-bold text-base truncate">{topic}</h1>
          <span className="text-xs text-smartly-purple-light font-medium">{subject}</span>
        </div>
      </motion.div>

      {/* Lesson Cards */}
      <div className="px-4 py-6 max-w-lg mx-auto space-y-5 pb-32">
        {/* Card 1: Definition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-smartly-surface/40 border-l-4 border-smartly-purple p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-smartly-purple/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-smartly-purple-light" />
            </div>
            <span className="text-xs font-semibold text-smartly-purple-light uppercase tracking-wider">
              Read this first
            </span>
          </div>
          <h2 className="text-white font-bold text-lg mb-3">
            What is {topic}?
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {lesson.definition}
          </p>
        </motion.div>

        {/* Card 2: Interest Hook */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-gradient-to-br from-smartly-purple/20 to-smartly-surface/40 border border-smartly-purple/30 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-smartly-purple/20 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-smartly-purple-light" />
            </div>
            <div>
              <span className="text-xs font-semibold text-smartly-purple-light uppercase tracking-wider">
                Think of it like this...
              </span>
              <p className="text-[10px] text-smartly-text-dim mt-0.5">
                How {interest} explains {topic.toLowerCase()}
              </p>
            </div>
          </div>
          <p className="text-white text-sm leading-relaxed">
            {lesson.interestHook}
          </p>
        </motion.div>

        {/* Card 3: Career Application */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-smartly-surface/40 border-l-4 border-smartly-amber/80 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-smartly-amber/20 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-smartly-amber" />
            </div>
            <div>
              <span className="text-xs font-semibold text-smartly-amber uppercase tracking-wider">
                Why this matters for your future
              </span>
              <p className="text-[10px] text-smartly-text-dim mt-0.5">
                As a future {career}
              </p>
            </div>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {lesson.careerApplication}
          </p>
        </motion.div>
      </div>

      {/* Fixed Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-smartly-navy via-smartly-navy to-transparent"
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={onTestMe}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-bold text-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Test Me 🧠
          </button>
        </div>
      </motion.div>
    </div>
  );
}