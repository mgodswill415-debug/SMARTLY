'use client';

import { create } from 'zustand';

export type Screen = 'landing' | 'auth' | 'onboarding-name' | 'onboarding-interests' | 'onboarding-career' | 'topic-input' | 'processing' | 'lesson' | 'quiz' | 'results' | 'admin';

export interface UserProfile {
  name: string;
  interests: string[];
  career: string;
  curriculum: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
}

export interface Lesson {
  definition: string;
  interestHook: string;
  careerApplication: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface LessonData {
  subject: string;
  topic: string;
  lesson: Lesson;
  quiz: QuizQuestion[];
  nextLesson: {
    topic: string;
    reason: string;
  };
}

interface AppState {
  screen: Screen;
  profile: UserProfile;
  authUser: AuthUser | null;
  authToken: string | null;
  userId: string;
  topic: string;
  lessonData: LessonData | null;
  quizAnswers: (string | null)[];
  quizSubmitted: boolean;
  setScreen: (screen: Screen) => void;
  setName: (name: string) => void;
  setInterests: (interests: string[]) => void;
  setCareer: (career: string) => void;
  setCurriculum: (curriculum: string) => void;
  setAuthUser: (user: AuthUser | null) => void;
  setAuthToken: (token: string | null) => void;
  setUserId: (id: string) => void;
  setTopic: (topic: string) => void;
  setLessonData: (data: LessonData) => void;
  setQuizAnswer: (index: number, answer: string) => void;
  setQuizSubmitted: (submitted: boolean) => void;
  resetApp: () => void;
  loadFromStorage: () => void;
  logout: () => void;
}

const STORAGE_KEY = 'smartly-profile';
const DEVICE_KEY = 'smartly-device-id';
const AUTH_TOKEN_KEY = 'smartly-auth-token';

const defaultProfile: UserProfile = {
  name: '',
  interests: [],
  career: '',
  curriculum: '',
};

function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = 'dev_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export const useAppStore = create<AppState>((set, get) => ({
  screen: 'landing',
  profile: defaultProfile,
  authUser: null,
  authToken: null,
  userId: '',
  topic: '',
  lessonData: null,
  quizAnswers: [null, null, null],
  quizSubmitted: false,

  setScreen: (screen) => set({ screen }),
  setName: (name) => set((s) => ({ profile: { ...s.profile, name } })),
  setInterests: (interests) => set((s) => ({ profile: { ...s.profile, interests } })),
  setCareer: (career) => set((s) => ({ profile: { ...s.profile, career } })),
  setCurriculum: (curriculum) => set((s) => ({ profile: { ...s.profile, curriculum } })),
  setAuthUser: (authUser) => set({ authUser }),
  setAuthToken: (authToken) => {
    if (typeof window !== 'undefined') {
      if (authToken) {
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }
    set({ authToken });
  },
  setUserId: (userId) => {
    if (typeof window !== 'undefined' && userId) {
      localStorage.setItem('smartly-user-id', userId);
    }
    set({ userId });
  },
  setTopic: (topic) => set({ topic }),
  setLessonData: (lessonData) => set({ lessonData, quizAnswers: [null, null, null], quizSubmitted: false }),
  setQuizAnswer: (index, answer) => set((s) => {
    const newAnswers = [...s.quizAnswers];
    newAnswers[index] = answer;
    return { quizAnswers: newAnswers };
  }),
  setQuizSubmitted: (quizSubmitted) => set({ quizSubmitted }),
  resetApp: () => set({ screen: 'topic-input', topic: '', lessonData: null, quizAnswers: [null, null, null], quizSubmitted: false }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('smartly-user-id');
      localStorage.removeItem(STORAGE_KEY);
    }
    set({
      screen: 'landing',
      authUser: null,
      authToken: null,
      userId: '',
      profile: defaultProfile,
      topic: '',
      lessonData: null,
      quizAnswers: [null, null, null],
      quizSubmitted: false,
    });
  },
  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        set({ profile: parsed });
      }
      const userId = localStorage.getItem('smartly-user-id');
      if (userId) set({ userId });

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) set({ authToken: token });

      // Ensure device ID exists
      getDeviceId();
    } catch {
      // ignore
    }
  },
}));

// Persist profile to localStorage
export function saveProfile(profile: UserProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

// Sync user to database
export async function syncUserToDb(profile: UserProfile, currentUserId: string): Promise<string> {
  try {
    const deviceId = getDeviceId();
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        name: profile.name,
        interests: profile.interests,
        career: profile.career,
        deviceId: currentUserId || deviceId,
      }),
    });
    const data = await res.json();
    if (data.id) {
      localStorage.setItem('smartly-user-id', data.id);
      return data.id;
    }
  } catch {
    // silent fail — app still works without DB
  }
  return currentUserId;
}

// Log lesson session to database
export async function logLessonToDb(params: {
  userId: string;
  topic: string;
  subject: string;
  interestUsed: string;
  careerUsed: string;
  score?: number;
  totalQuestions?: number;
}) {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    await fetch('/api/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(params),
    });
  } catch {
    // silent fail
  }
}

// Validate current session on app load
export async function validateSession(): Promise<AuthUser | null> {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;

    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    }
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}