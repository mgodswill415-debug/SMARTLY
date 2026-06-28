'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, TrendingUp, ArrowLeft, RefreshCw, Brain, Briefcase, Gamepad2 } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalSessions: number;
  avgScore: string;
  scoredSessionsCount: number;
  popularTopics: Array<{ topic: string; count: number }>;
  subjectDistribution: Array<{ subject: string; count: number }>;
  careerDistribution: Array<{ career: string; count: number }>;
  topInterests: Array<{ interest: string; count: number }>;
  dailySessions: Array<{ date: string; count: number }>;
  recentUsers: Array<{ id: string; name: string; career: string; interests: string; createdAt: string }>;
  recentSessions: Array<{
    id: string; topic: string; subject: string; score: number | null;
    totalQuestions: number | null; userName: string; userCareer: string; createdAt: string;
  }>;
}

interface AdminScreenProps {
  onBack: () => void;
}

export default function AdminScreen({ onBack }: AdminScreenProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
    setLoading(false);
  };

  // Fetch on mount using setTimeout to satisfy React lint
  useEffect(() => {
    const timer = setTimeout(fetchStats, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statCards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-purple-500 to-violet-600' },
    { label: 'Lessons Generated', value: stats.totalSessions, icon: BookOpen, color: 'from-teal-500 to-cyan-600' },
    { label: 'Avg Quiz Score', value: stats.avgScore, icon: Trophy, color: 'from-amber-500 to-orange-600' },
    { label: 'Quizzes Taken', value: stats.scoredSessionsCount, icon: Brain, color: 'from-pink-500 to-rose-600' },
  ] : [];

  return (
    <div className="min-h-screen bg-smartly-navy">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-smartly-navy/90 backdrop-blur-lg border-b border-smartly-purple/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-smartly-surface/50 flex items-center justify-center hover:bg-smartly-surface transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-white font-bold text-base">Smartly Admin</h1>
          <span className="text-xs text-smartly-text-dim">Dashboard & Analytics</span>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="w-10 h-10 rounded-xl bg-smartly-purple/20 flex items-center justify-center hover:bg-smartly-purple/30 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 text-smartly-purple-light ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="px-4 py-5 max-w-4xl mx-auto pb-20">
        {loading && !stats ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-smartly-purple/30 border-t-smartly-purple rounded-full animate-spin" />
          </div>
        ) : stats ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {statCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-smartly-surface/50 border border-smartly-purple/10 rounded-2xl p-4"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-2`}>
                    <card.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                  <p className="text-xs text-smartly-text-dim mt-0.5">{card.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Popular Topics */}
            {stats.popularTopics.length > 0 && (
              <Section title="Popular Topics" icon={TrendingUp} delay={0.2}>
                <div className="space-y-2">
                  {stats.popularTopics.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-smartly-text-dim text-xs w-5 text-right">{t.count}x</span>
                      <div className="flex-1 h-8 rounded-lg bg-smartly-surface/40 flex items-center px-3">
                        <span className="text-white text-sm truncate">{t.topic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Two column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Career Distribution */}
              {stats.careerDistribution.length > 0 && (
                <Section title="Dream Careers" icon={Briefcase} delay={0.3}>
                  <div className="space-y-2">
                    {stats.careerDistribution.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-zinc-300 text-sm">{c.career}</span>
                        <span className="text-smartly-purple-light text-sm font-semibold">{c.count}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Top Interests */}
              {stats.topInterests.length > 0 && (
                <Section title="Top Interests" icon={Gamepad2} delay={0.35}>
                  <div className="space-y-2">
                    {stats.topInterests.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-zinc-300 text-sm">{c.interest}</span>
                        <span className="text-smartly-purple-light text-sm font-semibold">{c.count}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Subject Distribution */}
            {stats.subjectDistribution.length > 0 && (
              <Section title="Subject Distribution" icon={BookOpen} delay={0.4}>
                <div className="flex flex-wrap gap-2">
                  {stats.subjectDistribution.map((s, i) => {
                    const colors = ['bg-purple-500/20 text-purple-300', 'bg-teal-500/20 text-teal-300', 'bg-amber-500/20 text-amber-300', 'bg-pink-500/20 text-pink-300', 'bg-cyan-500/20 text-cyan-300', 'bg-rose-500/20 text-rose-300'];
                    return (
                      <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium ${colors[i % colors.length]}`}>
                        {s.subject} ({s.count})
                      </span>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Recent Sessions */}
            {stats.recentSessions.length > 0 && (
              <Section title="Recent Activity" icon={TrendingUp} delay={0.5}>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {stats.recentSessions.map((s, i) => {
                    const pct = s.totalQuestions ? Math.round(((s.score || 0) / s.totalQuestions) * 100) : null;
                    return (
                      <div key={i} className="bg-smartly-surface/30 rounded-xl p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                          pct === null ? 'bg-smartly-purple/20 text-smartly-purple-light' :
                          pct >= 80 ? 'bg-green-500/20 text-green-400' :
                          pct >= 50 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {pct !== null ? `${pct}%` : '...'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{s.topic}</p>
                          <p className="text-smartly-text-dim text-xs">{s.userName} · {s.subject}</p>
                        </div>
                        <span className="text-smartly-text-dim text-xs shrink-0">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Recent Users */}
            {stats.recentUsers.length > 0 && (
              <Section title="Recent Users" icon={Users} delay={0.6}>
                <div className="space-y-2">
                  {stats.recentUsers.map((u, i) => (
                    <div key={i} className="flex items-center gap-3 py-1">
                      <div className="w-8 h-8 rounded-full bg-smartly-purple/20 flex items-center justify-center text-sm font-bold text-smartly-purple-light shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{u.name}</p>
                        <p className="text-smartly-text-dim text-xs">{u.career}</p>
                      </div>
                      <span className="text-smartly-text-dim text-xs shrink-0">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </motion.div>
        ) : (
          <p className="text-smartly-text-dim text-center py-20">Failed to load stats.</p>
        )}
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, delay, children }: { title: string; icon: React.ElementType; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-smartly-surface/30 border border-smartly-purple/10 rounded-2xl p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-smartly-purple-light" />
        <h3 className="text-white font-semibold text-sm">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}