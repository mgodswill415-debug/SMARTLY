'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Loader2 } from 'lucide-react';

interface ProcessingScreenProps {
  isReady: boolean;
}

const steps = [
  { icon: Brain, text: 'Analyzing your profile...' },
  { icon: Sparkles, text: 'Matching topic with your interests...' },
  { icon: Zap, text: 'Building your personalized lesson...' },
];

export default function ProcessingScreen({ isReady }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  // Cycle through steps while waiting
  useEffect(() => {
    if (isReady) return;

    // Advance through steps
    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 1200),
      setTimeout(() => setCurrentStep(2), 3000),
    ];

    // After initial steps, show a loading indicator
    const loaderTimer = setTimeout(() => setShowLoader(true), 5000);

    // Loop the last step animation to show it's still working
    const loopTimer = setInterval(() => {
      setCurrentStep((prev) => prev === 2 ? 1 : 2);
    }, 4000);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(loaderTimer);
      clearInterval(loopTimer);
    };
  }, [isReady]);

  return (
    <div className="min-h-screen bg-smartly-navy flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Particle network background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {[
            [80, 120, 200, 180], [200, 180, 350, 100], [350, 100, 300, 280],
            [300, 280, 150, 350], [150, 350, 80, 120], [200, 180, 300, 280],
            [80, 120, 300, 280], [350, 100, 150, 350],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${x1}px`}
              y1={`${y1}px`}
              x2={`${x2}px`}
              y2={`${y2}px`}
              stroke="#8b5cf6"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
          {[
            [80, 120], [200, 180], [350, 100], [300, 280], [150, 350],
            [450, 200], [100, 400], [380, 380],
          ].map(([x, y], i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={`${x}px`}
              cy={`${y}px`}
              r="3"
              fill="#8b5cf6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                delay: i * 0.4,
                repeat: Infinity,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated icon */}
        <motion.div
          key={currentStep}
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-smartly-purple to-smartly-purple-light flex items-center justify-center mb-8 glow-pulse"
        >
          {(() => {
            const Icon = steps[currentStep].icon;
            return <Icon className="w-12 h-12 text-white" />;
          })()}
        </motion.div>

        {/* Status text */}
        <motion.p
          key={steps[currentStep].text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-lg sm:text-xl font-medium mb-4 text-center"
        >
          {steps[currentStep].text}
        </motion.p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 rounded-full bg-smartly-surface overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-smartly-purple to-smartly-purple-light"
            initial={{ width: '0%' }}
            animate={{ width: isReady ? '100%' : '66%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex gap-2 mt-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= currentStep ? 'bg-smartly-purple' : 'bg-smartly-purple/20'
              }`}
            />
          ))}
        </div>

        {/* Extended wait message */}
        {showLoader && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex items-center gap-2 text-smartly-text-dim text-sm"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI is crafting your lesson...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}