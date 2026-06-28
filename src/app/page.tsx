'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore, syncUserToDb, logLessonToDb, validateSession, saveProfile, type Screen } from '@/lib/store';
import LandingScreen from '@/components/smartly/LandingScreen';
import AuthScreen from '@/components/smartly/AuthScreen';
import OnboardingScreen from '@/components/smartly/OnboardingScreen';
import TopicInputScreen from '@/components/smartly/TopicInputScreen';
import ProcessingScreen from '@/components/smartly/ProcessingScreen';
import LessonScreen from '@/components/smartly/LessonScreen';
import QuizScreen from '@/components/smartly/QuizScreen';
import ResultsScreen from '@/components/smartly/ResultsScreen';
import AdminScreen from '@/components/smartly/AdminScreen';

const ONBOARDING_STEPS: Screen[] = ['onboarding-name', 'onboarding-interests', 'onboarding-career'];

export default function SmartlyApp() {
  const screen = useAppStore((s) => s.screen);
  const profile = useAppStore((s) => s.profile);
  const authUser = useAppStore((s) => s.authUser);
  const userId = useAppStore((s) => s.userId);
  const lessonData = useAppStore((s) => s.lessonData);
  const quizAnswers = useAppStore((s) => s.quizAnswers);
  const setScreen = useAppStore((s) => s.setScreen);
  const setName = useAppStore((s) => s.setName);
  const setInterests = useAppStore((s) => s.setInterests);
  const setCareer = useAppStore((s) => s.setCareer);
  const setCurriculum = useAppStore((s) => s.setCurriculum);
  const setAuthToken = useAppStore((s) => s.setAuthToken);
  const setAuthUser = useAppStore((s) => s.setAuthUser);
  const setUserId = useAppStore((s) => s.setUserId);
  const setTopic = useAppStore((s) => s.setTopic);
  const setLessonData = useAppStore((s) => s.setLessonData);
  const setQuizAnswer = useAppStore((s) => s.setQuizAnswer);
  const setQuizSubmitted = useAppStore((s) => s.setQuizSubmitted);
  const resetApp = useAppStore((s) => s.resetApp);

  const dbSyncedRef = useRef(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Load persisted profile + validate session on mount
  useEffect(() => {
    useAppStore.getState().loadFromStorage();

    // Check if there's a valid session
    validateSession().then((user) => {
      if (user) {
        const s = useAppStore.getState();
        s.setAuthUser(user);
        s.setUserId(user.id);
        // Restore profile from session if localStorage was empty
        if (user.name && (!s.profile.name || s.profile.name !== user.name)) {
          s.setName(user.name);
        }
        if (user.interests && user.interests.length > 0 && s.profile.interests.length === 0) {
          s.setInterests(user.interests);
        }
        if (user.career && !s.profile.career) {
          s.setCareer(user.career);
        }
        s.setScreen('topic-input');
      }
      setSessionChecked(true);
    });
  }, []);

  // Determine onboarding step
  const onboardingStep = ONBOARDING_STEPS.includes(screen)
    ? screen as 'name' | 'interests' | 'career'
    : null;

  // If user has completed profile and is on landing/auth, skip to topic input
  useEffect(() => {
    if (!sessionChecked) return;
    if (profile.name && profile.interests.length > 0 && profile.career) {
      if (screen === 'landing' || screen === 'auth') {
        setScreen('topic-input');
      }
      // Sync user to DB once
      if (!dbSyncedRef.current && userId) {
        dbSyncedRef.current = true;
        syncUserToDb(profile, userId).then((id) => {
          if (id) setUserId(id);
        });
      }
    }
  }, [profile, screen, userId, sessionChecked, setScreen, setUserId]);

  const handleStartLearning = useCallback(() => {
    const s = useAppStore.getState();
    if (!s.authUser) {
      s.setScreen('auth');
      return;
    }
    if (s.profile.name && s.profile.interests.length > 0 && s.profile.career) {
      s.setScreen('topic-input');
    } else if (s.profile.name) {
      if (s.profile.interests.length > 0) {
        s.setScreen('onboarding-career');
      } else {
        s.setScreen('onboarding-interests');
      }
    } else {
      s.setScreen('onboarding-name');
    }
  }, []);

  const handleAuthSuccess = useCallback((result: {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    token: string;
    isNew: boolean;
    hasProfile?: boolean;
    profile?: { name: string; interests: string[]; career: string };
  }) => {
    const s = useAppStore.getState();
    s.setAuthToken(result.token);
    s.setAuthUser({ id: result.id, name: result.name, email: result.email, whatsapp: result.whatsapp });
    s.setUserId(result.id);

    // Restore profile from DB if available
    if (result.profile) {
      s.setName(result.profile.name);
      s.setInterests(result.profile.interests);
      s.setCareer(result.profile.career);
      saveProfile(result.profile);
    }

    if (result.isNew) {
      // New user — go through interests/career onboarding
      s.setScreen('onboarding-interests');
    } else if (result.hasProfile) {
      // Returning user with complete profile — straight to topic input
      s.setScreen('topic-input');
    } else {
      // Returning user without complete profile
      s.setScreen('onboarding-interests');
    }
  }, []);

  const handleOnboardingNext = useCallback(() => {
    const s = useAppStore.getState();
    const idx = ONBOARDING_STEPS.indexOf(s.screen);
    if (idx < ONBOARDING_STEPS.length - 1) {
      s.setScreen(ONBOARDING_STEPS[idx + 1]);
    } else {
      // Onboarding complete — sync to DB with latest profile
      syncUserToDb(s.profile, s.userId).then((id) => {
        if (id) s.setUserId(id);
      });
      s.setScreen('topic-input');
    }
  }, []);

  const handleOnboardingBack = useCallback(() => {
    const s = useAppStore.getState();
    const idx = ONBOARDING_STEPS.indexOf(s.screen);
    if (idx > 0) {
      s.setScreen(ONBOARDING_STEPS[idx - 1]);
    } else {
      s.setScreen('auth');
    }
  }, []);

  const handleTeachMe = useCallback(async (topic: string) => {
    const s = useAppStore.getState();
    s.setTopic(topic);
    s.setLessonData(null);
    s.setScreen('processing');

    try {
      const res = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          interest: s.profile.interests[0] || 'Gaming',
          career: s.profile.career,
          name: s.profile.name,
          curriculum: s.profile.curriculum,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      s.setLessonData(data);

      // Log lesson to DB
      const currentState = useAppStore.getState();
      if (currentState.userId) {
        logLessonToDb({
          userId: currentState.userId,
          topic,
          subject: data.subject || 'Unknown',
          interestUsed: currentState.profile.interests[0] || 'Gaming',
          careerUsed: currentState.profile.career,
        });
      }

      s.setScreen('lesson');
    } catch (err) {
      console.error('Failed to generate lesson:', err);
      s.setScreen('topic-input');
    }
  }, []);

  const handleLearnNext = useCallback(async () => {
    const s = useAppStore.getState();
    if (!s.lessonData?.nextLesson) return;
    const nextTopic = s.lessonData.nextLesson.topic;
    await handleTeachMe(nextTopic);
  }, [handleTeachMe]);

  const handleStudyElse = useCallback(() => {
    useAppStore.getState().resetApp();
  }, []);

  const handleQuizSubmit = useCallback(() => {
    const s = useAppStore.getState();
    // Calculate score and log to DB
    if (s.lessonData && s.userId) {
      const { quiz } = s.lessonData;
      const score = quiz.reduce(
        (acc, q, i) => acc + (s.quizAnswers[i] === q.answer ? 1 : 0),
        0
      );
      logLessonToDb({
        userId: s.userId,
        topic: s.lessonData.topic,
        subject: s.lessonData.subject,
        interestUsed: s.profile.interests[0] || 'Gaming',
        careerUsed: s.profile.career,
        score,
        totalQuestions: quiz.length,
      });
    }
    s.setQuizSubmitted(true);
    s.setScreen('results');
  }, []);

  const getOnboardingStep = (): 'name' | 'interests' | 'career' => {
    if (screen === 'onboarding-name') return 'name';
    if (screen === 'onboarding-interests') return 'interests';
    return 'career';
  };

  // Show nothing until session check completes
  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-smartly-navy flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-smartly-purple/30 border-t-smartly-purple rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-smartly-navy">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LandingScreen onStartLearning={handleStartLearning} />
          </motion.div>
        )}

        {screen === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AuthScreen
              onAuthSuccess={handleAuthSuccess}
              onBack={() => setScreen('landing')}
            />
          </motion.div>
        )}

        {onboardingStep && (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <OnboardingScreen
              step={getOnboardingStep()}
              profile={profile}
              onSetName={(name) => {
                setName(name);
                saveProfile({ ...profile, name });
              }}
              onSetInterests={(interests) => {
                setInterests(interests);
                saveProfile({ ...useAppStore.getState().profile, interests });
              }}
              onSetCareer={(career) => {
                setCareer(career);
                saveProfile({ ...useAppStore.getState().profile, career });
              }}
              onBack={handleOnboardingBack}
              onNext={handleOnboardingNext}
            />
          </motion.div>
        )}

        {screen === 'topic-input' && (
          <motion.div key="topic-input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <TopicInputScreen
              onTeachMe={handleTeachMe}
              userName={profile.name}
              onAdmin={() => setScreen('admin')}
              curriculum={profile.curriculum}
              onCurriculumChange={(c) => {
                setCurriculum(c);
                saveProfile({ ...useAppStore.getState().profile, curriculum: c });
              }}
            />
          </motion.div>
        )}

        {screen === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <ProcessingScreen isReady={!!lessonData} />
          </motion.div>
        )}

        {screen === 'lesson' && lessonData && (
          <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LessonScreen
              lessonData={lessonData}
              interest={profile.interests[0] || 'Gaming'}
              career={profile.career}
              onTestMe={() => setScreen('quiz')}
              onBack={() => setScreen('topic-input')}
            />
          </motion.div>
        )}

        {screen === 'quiz' && lessonData && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <QuizScreen
              lessonData={lessonData}
              quizAnswers={quizAnswers}
              onAnswer={setQuizAnswer}
              onSubmit={handleQuizSubmit}
            />
          </motion.div>
        )}

        {screen === 'results' && lessonData && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ResultsScreen
              lessonData={lessonData}
              quizAnswers={quizAnswers}
              onLearnNext={handleLearnNext}
              onStudyElse={handleStudyElse}
            />
          </motion.div>
        )}

        {screen === 'admin' && (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AdminScreen onBack={() => setScreen('topic-input')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}