'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { QuizQuestion, LessonData } from '@/lib/store';

interface QuizScreenProps {
  lessonData: LessonData;
  quizAnswers: (string | null)[];
  onAnswer: (index: number, answer: string) => void;
  onSubmit: () => void;
}

export default function QuizScreen({
  lessonData,
  quizAnswers,
  onAnswer,
  onSubmit,
}: QuizScreenProps) {
  const { quiz } = lessonData;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const isAnswered = quizAnswers[currentQuestion] !== null;
  const isCorrect = quizAnswers[currentQuestion] === quiz[currentQuestion].answer;
  const allAnswered = quizAnswers.every((a) => a !== null);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    onAnswer(currentQuestion, option);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      onSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-smartly-navy flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-smartly-purple/10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-white font-bold text-lg">Quick Check</h1>
          <span className="text-smartly-text-dim text-sm">
            Question {currentQuestion + 1} of {quiz.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="flex gap-1.5">
          {quiz.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                i < currentQuestion
                  ? quizAnswers[i] === quiz[i].answer
                    ? 'bg-smartly-green'
                    : 'bg-smartly-red'
                  : i === currentQuestion
                  ? 'bg-smartly-purple'
                  : 'bg-smartly-purple/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question card */}
            <div className="bg-smartly-surface/40 rounded-2xl p-5 mb-6">
              <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                {quiz[currentQuestion].question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {quiz[currentQuestion].options.map((option, i) => {
                const isSelected = quizAnswers[currentQuestion] === option;
                const isRightAnswer = option === quiz[currentQuestion].answer;
                const showCorrect = isAnswered && isRightAnswer;
                const showWrong = isAnswered && isSelected && !isRightAnswer;
                const showDimmed = isAnswered && !isSelected && !isRightAnswer;

                return (
                  <motion.button
                    key={i}
                    whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                    onClick={() => handleSelect(option)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      showCorrect
                        ? 'border-smartly-green bg-smartly-green/10'
                        : showWrong
                        ? 'border-smartly-red bg-smartly-red/10'
                        : showDimmed
                        ? 'border-smartly-purple/5 bg-smartly-surface/10 opacity-40'
                        : 'border-smartly-purple/15 bg-smartly-surface/30 hover:border-smartly-purple/40 hover:bg-smartly-surface/50'
                    }`}
                  >
                    {/* Letter badge */}
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                        showCorrect
                          ? 'bg-smartly-green text-white'
                          : showWrong
                          ? 'bg-smartly-red text-white'
                          : 'bg-smartly-purple/15 text-smartly-text-dim'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>

                    {/* Option text */}
                    <span
                      className={`text-sm flex-1 ${
                        showCorrect
                          ? 'text-smartly-green font-medium'
                          : showWrong
                          ? 'text-smartly-red'
                          : 'text-zinc-300'
                      }`}
                    >
                      {option}
                    </span>

                    {/* Icon */}
                    {showCorrect && <Check className="w-5 h-5 text-smartly-green shrink-0" />}
                    {showWrong && <X className="w-5 h-5 text-smartly-red shrink-0" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback for wrong answer */}
            {isAnswered && !isCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-smartly-amber/10 border border-smartly-amber/20"
              >
                <p className="text-smartly-amber text-sm">
                  The correct answer is <strong>{quiz[currentQuestion].answer}</strong>
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next / Submit button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-t from-smartly-navy via-smartly-navy to-transparent"
        >
          <button
            onClick={handleNext}
            className="w-full max-w-lg mx-auto py-4 rounded-2xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-bold text-base hover:opacity-90 transition-opacity cursor-pointer"
          >
            {currentQuestion < quiz.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </motion.div>
      )}
    </div>
  );
}