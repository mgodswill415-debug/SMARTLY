'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  LogOut,
  BookOpen,
  ChevronRight,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { EXAM_BOARDS, REGIONS, type Subject } from '@/lib/curricula';

interface TopicInputScreenProps {
  onTeachMe: (topic: string) => void;
  userName: string;
  onAdmin?: () => void;
  curriculum?: string; // exam board ID like 'waec-ss3', 'gcse', 'ap', etc.
  onCurriculumChange?: (curriculumId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function TopicInputScreen({
  onTeachMe,
  userName,
  onAdmin,
  curriculum,
  onCurriculumChange,
}: TopicInputScreenProps) {
  const [topic, setTopic] = useState('');
  const [tapCount, setTapCount] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { authUser, logout } = useAppStore();

  const activeBoardId = curriculum || 'waec-ss3';
  const selectedBoard = EXAM_BOARDS.find((b) => b.id === activeBoardId);
  const subjects = selectedBoard?.subjects ?? [];

  const popularTopics = selectedSubject
    ? subjects.find((s) => s.name === selectedSubject)?.popularTopics ?? []
    : subjects.slice(0, 6).flatMap((s) => s.popularTopics.slice(0, 1));

  const handleSubmit = () => {
    if (topic.trim()) {
      onTeachMe(topic.trim());
    }
  };

  const handleSubjectChipClick = (subject: Subject) => {
    setSelectedSubject(subject.name === selectedSubject ? null : subject.name);
    setTopic(subject.name);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handlePopularClick = (t: string) => {
    setTopic(t);
    setSelectedSubject(null);
    onTeachMe(t);
  };

  const handleBoardChange = (id: string) => {
    onCurriculumChange?.(id);
    setSelectedSubject(null);
    setTopic('');
  };

  return (
    <div className="min-h-screen bg-smartly-navy flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Logout button — top right */}
      {authUser && (
        <button
          onClick={logout}
          className="absolute top-5 right-5 flex items-center gap-2 px-3 py-2 rounded-xl bg-smartly-surface/50 border border-smartly-purple/10 text-smartly-text-dim text-xs hover:text-white hover:border-smartly-purple/30 transition-all cursor-pointer z-10"
          title="Log out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      )}

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-smartly-purple/20 particle"
            style={{
              left: `${10 + i * 16}%`,
              top: `${10 + (i % 4) * 22}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i * 0.5}s`,
            }}
          />
        ))}
        {/* Subtle radial glow behind content */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-smartly-purple/[0.04] rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeBoardId}
        className="w-full max-w-lg relative z-10"
      >
        {/* Smartly Logo */}
        <motion.div variants={itemVariants} className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden glow-pulse relative">
            <Image
              src="/smartly-logo.png"
              alt="Smartly Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.div variants={itemVariants} className="text-center mb-7">
          <h1
            className="text-2xl sm:text-3xl font-bold text-white mb-2 select-none cursor-default"
            onClick={() => {
              const next = tapCount + 1;
              setTapCount(next);
              if (next >= 5 && onAdmin) onAdmin();
            }}
          >
            Hey {userName}! 👋
          </h1>
          <p className="text-smartly-text-dim text-sm sm:text-base leading-relaxed">
            What do you want to learn today?
          </p>
        </motion.div>

        {/* Exam Board Selector */}
        <motion.div variants={itemVariants} className="mb-5 relative">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-smartly-purple-light" />
            <span className="text-smartly-text-dim text-sm font-medium">
              Curriculum
            </span>
          </div>
          <div className="relative">
            <select
              value={activeBoardId}
              onChange={(e) => handleBoardChange(e.target.value)}
              className="w-full py-3 pl-4 pr-10 rounded-xl bg-smartly-surface/50 border border-smartly-purple/20 text-white text-sm focus:outline-none focus:border-smartly-purple/60 appearance-none cursor-pointer [&>option]:bg-[#0f1a2e] [&>option]:text-white [&>option]:py-2 [&>option]:px-3 [&>optgroup]:bg-[#0a1222] [&>optgroup]:text-smartly-purple-light [&>optgroup]:font-semibold [&>optgroup]:text-xs [&>optgroup]:uppercase [&>optgroup]:tracking-wider"
            >
              {REGIONS.map((region) => (
                <optgroup key={region.name} label={`${region.flag} ${region.name}`}>
                  {region.boards.map((board) => (
                    <option key={board.id} value={board.id}>
                      {board.shortName}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-smartly-text-dim pointer-events-none" />
          </div>
        </motion.div>

        {/* Subject Category Chips — horizontal scrollable, dynamic based on board */}
        <motion.div variants={itemVariants} className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-smartly-purple-light" />
            <span className="text-smartly-text-dim text-sm font-medium">
              {selectedBoard ? `${selectedBoard.flag} ${selectedBoard.name} Subjects` : 'Subjects'}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-smartly-purple/20 scrollbar-track-transparent -mx-1 px-1">
            {subjects.map((subject) => {
              const isActive = selectedSubject === subject.name;
              return (
                <button
                  key={subject.name}
                  onClick={() => handleSubjectChipClick(subject)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-smartly-purple/25 border-smartly-purple/60 text-white shadow-[0_0_16px_rgba(139,92,246,0.25)]'
                      : 'bg-smartly-surface/40 border-smartly-purple/15 text-smartly-purple-light hover:bg-smartly-purple/15 hover:border-smartly-purple/40'
                  }`}
                >
                  <span>{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Search Input — big & prominent */}
        <motion.div variants={itemVariants} className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-smartly-text-dim pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              // Deselect subject chip if user clears/changes manually
              if (selectedSubject && e.target.value !== selectedSubject) {
                setSelectedSubject(null);
              }
            }}
            placeholder="Type any topic... e.g. Photosynthesis, Quadratic Equations"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-smartly-surface/50 border border-smartly-purple/20 text-white placeholder:text-smartly-text-dim/50 focus:outline-none focus:border-smartly-purple/60 focus:ring-2 focus:ring-smartly-purple/20 transition-all text-base"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </motion.div>

        {/* Hint text */}
        <motion.p
          variants={itemVariants}
          className="text-center text-smartly-text-dim/60 text-xs mb-5"
        >
          You can type <span className="text-smartly-purple-light font-medium">any subject or topic</span> — not just the ones shown
        </motion.p>

        {/* Teach Me Button — big, gradient purple */}
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={handleSubmit}
          disabled={!topic.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-smartly-purple to-smartly-purple-light text-white font-bold text-lg hover:shadow-[0_0_32px_rgba(139,92,246,0.35)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer mb-8 flex items-center justify-center gap-2"
        >
          TEACH ME
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Popular Topics */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-smartly-purple-light" />
            <span className="text-smartly-text-dim text-sm font-medium">
              {selectedSubject ? `Popular in ${selectedSubject}` : 'Popular topics'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTopics.map((t) => (
              <button
                key={t}
                onClick={() => handlePopularClick(t)}
                className="px-3 py-1.5 rounded-full bg-smartly-surface/30 border border-smartly-purple/10 text-smartly-text-dim text-xs font-medium hover:bg-smartly-purple/10 hover:border-smartly-purple/30 hover:text-smartly-purple-light transition-all cursor-pointer"
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}