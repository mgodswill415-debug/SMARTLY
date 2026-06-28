'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Gamepad2, Tv, Goal, Music, ChefHat, Film, Stethoscope, Wrench, Scale, Microscope, Building2, Plane, Brush, Laptop, Sparkles, User } from 'lucide-react';
import type { UserProfile } from '@/lib/store';
import { saveProfile } from '@/lib/store';

interface OnboardingScreenProps {
  step: 'name' | 'interests' | 'career';
  profile: UserProfile;
  onSetName: (name: string) => void;
  onSetInterests: (interests: string[]) => void;
  onSetCareer: (career: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const interests = [
  { id: 'Gaming', icon: Gamepad2, label: 'Gaming' },
  { id: 'Anime', icon: Tv, label: 'Anime' },
  { id: 'Football', icon: Goal, label: 'Football' },
  { id: 'Music', icon: Music, label: 'Music' },
  { id: 'Movies', icon: Film, label: 'Movies' },
  { id: 'Cooking', icon: ChefHat, label: 'Cooking' },
  { id: 'Fashion', icon: Brush, label: 'Fashion' },
  { id: 'Tech', icon: Laptop, label: 'Tech' },
];

const careers = [
  { id: 'Doctor', icon: Stethoscope, label: 'Doctor' },
  { id: 'Engineer', icon: Wrench, label: 'Engineer' },
  { id: 'Lawyer', icon: Scale, label: 'Lawyer' },
  { id: 'Scientist', icon: Microscope, label: 'Scientist' },
  { id: 'Architect', icon: Building2, label: 'Architect' },
  { id: 'Pilot', icon: Plane, label: 'Pilot' },
  { id: 'Entrepreneur', icon: Sparkles, label: 'Entrepreneur' },
  { id: 'Artist', icon: Brush, label: 'Artist' },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function OnboardingScreen({
  step,
  profile,
  onSetName,
  onSetInterests,
  onSetCareer,
  onBack,
  onNext,
}: OnboardingScreenProps) {
  const [nameInput, setNameInput] = useState(profile.name);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests);
  const [selectedCareer, setSelectedCareer] = useState(profile.career);
  const [direction, setDirection] = useState(1);

  const stepIndex = step === 'name' ? 0 : step === 'interests' ? 1 : 2;

  const handleNameNext = () => {
    onSetName(nameInput.trim());
    saveProfile({ ...profile, name: nameInput.trim() });
    setDirection(1);
    onNext();
  };

  const handleInterestsNext = () => {
    onSetInterests(selectedInterests);
    saveProfile({ ...profile, interests: selectedInterests });
    setDirection(1);
    onNext();
  };

  const handleCareerNext = () => {
    onSetCareer(selectedCareer);
    saveProfile({ ...profile, name: profile.name, interests: profile.interests.length ? profile.interests : selectedInterests, career: selectedCareer });
    setDirection(1);
    onNext();
  };

  const handleBack = () => {
    setDirection(-1);
    onBack();
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-smartly-navy flex flex-col px-6 py-8 relative">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === stepIndex ? 'w-8 bg-smartly-purple' : 'w-2 bg-smartly-purple/30'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {step === 'name' && (
          <motion.div
            key="name"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-smartly-purple/20 flex items-center justify-center">
                <User className="w-6 h-6 text-smartly-purple-light" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What&apos;s your name?
            </h1>
            <p className="text-smartly-text-dim text-sm mb-8">
              We&apos;ll personalize everything just for you.
            </p>
            <div className="relative mb-8">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-4 rounded-xl bg-smartly-surface/50 border border-smartly-purple/20 text-white placeholder:text-smartly-text-dim/50 focus:outline-none focus:border-smartly-purple/60 focus:ring-2 focus:ring-smartly-purple/20 transition-all text-base"
                onKeyDown={(e) => e.key === 'Enter' && nameInput.trim() && handleNameNext()}
              />
            </div>
            <button
              onClick={handleNameNext}
              disabled={!nameInput.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 'interests' && (
          <motion.div
            key="interests"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col max-w-md mx-auto w-full"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-smartly-purple/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-smartly-purple-light" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What do you actually enjoy?
            </h1>
            <p className="text-smartly-text-dim text-sm mb-6">
              Pick what you love. We&apos;ll explain topics in your language.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
              {interests.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleInterest(item.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedInterests.includes(item.id)
                      ? 'border-smartly-purple bg-smartly-purple/15 shadow-lg shadow-smartly-purple/20'
                      : 'border-smartly-purple/10 bg-smartly-surface/30 hover:border-smartly-purple/30'
                  }`}
                >
                  <item.icon
                    className={`w-7 h-7 transition-colors ${
                      selectedInterests.includes(item.id)
                        ? 'text-smartly-purple-light'
                        : 'text-smartly-text-dim'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      selectedInterests.includes(item.id)
                        ? 'text-white'
                        : 'text-smartly-text-dim'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="px-4 py-4 rounded-xl border border-smartly-purple/20 text-smartly-text-dim hover:bg-smartly-surface/30 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleInterestsNext}
                disabled={selectedInterests.length === 0}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 'career' && (
          <motion.div
            key="career"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col max-w-md mx-auto w-full"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-smartly-purple/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-smartly-purple-light" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What do you want to become?
            </h1>
            <p className="text-smartly-text-dim text-sm mb-6">
              This helps us show why each topic matters for your future.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
              {careers.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCareer(item.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedCareer === item.id
                      ? 'border-smartly-purple bg-smartly-purple/15 shadow-lg shadow-smartly-purple/20'
                      : 'border-smartly-purple/10 bg-smartly-surface/30 hover:border-smartly-purple/30'
                  }`}
                >
                  <item.icon
                    className={`w-7 h-7 transition-colors ${
                      selectedCareer === item.id
                        ? 'text-smartly-purple-light'
                        : 'text-smartly-text-dim'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      selectedCareer === item.id
                        ? 'text-white'
                        : 'text-smartly-text-dim'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="px-4 py-4 rounded-xl border border-smartly-purple/20 text-smartly-text-dim hover:bg-smartly-surface/30 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleCareerNext}
                disabled={!selectedCareer}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
