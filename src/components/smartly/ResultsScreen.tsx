'use client';

import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import type { LessonData } from '@/lib/store';

interface ResultsScreenProps {
  lessonData: LessonData;
  quizAnswers: (string | null)[];
  onLearnNext: () => void;
  onStudyElse: () => void;
}

export default function ResultsScreen({
  lessonData,
  quizAnswers,
  onLearnNext,
  onStudyElse,
}: ResultsScreenProps) {
  const { quiz, nextLesson } = lessonData;
  const score = quizAnswers.reduce(
    (acc, answer, i) => acc + (answer === quiz[i].answer ? 1 : 0),
    0
  );
  const total = quiz.length;
  const perfect = score === total;
  const passing = score >= Math.ceil(total / 2);

  return (
    <div className="min-h-screen bg-smartly-navy flex flex-col items-center justify-center px-6 relative">
      {/* Background glow */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] ${
          perfect ? 'bg-smartly-green/20' : passing ? 'bg-smartly-amber/20' : 'bg-smartly-red/20'
        }`}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative z-10 text-center w-full max-w-md"
      >
        {/* Score circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="8"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={perfect ? '#22c55e' : passing ? '#f59e0b' : '#ef4444'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 52 * (1 - score / total),
              }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-3xl font-bold ${
                perfect ? 'text-smartly-green' : passing ? 'text-smartly-amber' : 'text-smartly-red'
              }`}
            >
              {score}/{total}
            </span>
          </div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {perfect ? (
              <Trophy className="w-6 h-6 text-smartly-green" />
            ) : passing ? (
              <Sparkles className="w-6 h-6 text-smartly-amber" />
            ) : (
              <RotateCcw className="w-6 h-6 text-smartly-red" />
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {perfect
              ? 'Perfect Score! 🎉'
              : passing
              ? 'Nice work! 👏'
              : 'Keep practicing! 💪'}
          </h1>
          <p className="text-smartly-text-dim text-sm mb-8">
            {perfect
              ? 'You nailed every question. You\'re ready for the next challenge!'
              : passing
              ? `You got ${score} out of ${total}. Almost there — keep going!`
              : `You got ${score} out of ${total}. Don't worry, review the lesson and try again.`}
          </p>
        </motion.div>

        {/* Next Lesson Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-smartly-surface/50 border border-smartly-purple/20 rounded-2xl p-5 text-left mb-6"
        >
          <span className="text-xs font-semibold text-smartly-purple-light uppercase tracking-wider">
            Up Next
          </span>
          <h3 className="text-white font-bold text-lg mt-1 mb-2">
            {nextLesson.topic}
          </h3>
          <p className="text-smartly-text-dim text-sm leading-relaxed">
            {nextLesson.reason}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={onLearnNext}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-bold text-base hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
          >
            Learn This Next
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onStudyElse}
            className="w-full py-4 rounded-2xl border border-smartly-purple/20 text-smartly-purple-light font-semibold text-base hover:bg-smartly-purple/10 transition-colors cursor-pointer"
          >
            Study Something Else
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}