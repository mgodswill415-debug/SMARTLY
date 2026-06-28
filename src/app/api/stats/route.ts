import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Admin stats endpoint
export async function GET() {
  try {
    const totalUsers = await db.user.count();
    const totalSessions = await db.lessonSession.count();

    // Average quiz score (only sessions where quiz was taken)
    const scoredSessions = await db.lessonSession.findMany({
      where: { score: { not: null } },
      select: { score: true, totalQuestions: true },
    });
    const avgScore = scoredSessions.length > 0
      ? (scoredSessions.reduce((sum, s) => sum + ((s.score || 0) / (s.totalQuestions || 1)) * 100, 0) / scoredSessions.length).toFixed(1)
      : '0';

    // Most popular topics
    const topicCounts = await db.lessonSession.groupBy({
      by: ['topic'],
      _count: { topic: true },
      orderBy: { _count: { topic: 'desc' } },
      take: 8,
    });

    // Subject distribution
    const subjectCounts = await db.lessonSession.groupBy({
      by: ['subject'],
      _count: { subject: true },
      orderBy: { _count: { subject: 'desc' } },
      take: 6,
    });

    // Career distribution
    const careerCounts = await db.user.groupBy({
      by: ['career'],
      _count: { career: true },
      orderBy: { _count: { career: 'desc' } },
      take: 6,
    });

    // Daily active users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentUsers = await db.user.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { id: true, name: true, career: true, interests: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    // Daily sessions (last 7 days)
    const dailySessions = await db.$queryRaw<
      Array<{ date: string; count: bigint }>
    >`
      SELECT DATE(createdAt) as date, COUNT(*) as count
      FROM LessonSession
      WHERE createdAt >= ${sevenDaysAgo}
      GROUP BY DATE(createdAt)
      ORDER BY date DESC
    `;

    // Recent sessions with user info
    const recentSessions = await db.lessonSession.findMany({
      include: { user: { select: { name: true, career: true } } },
      orderBy: { createdAt: 'desc' },
      take: 15,
    });

    // Interest distribution
    const allUsers = await db.user.findMany({ select: { interests: true } });
    const interestMap: Record<string, number> = {};
    for (const u of allUsers) {
      try {
        const interests: string[] = JSON.parse(u.interests);
        for (const i of interests) {
          interestMap[i] = (interestMap[i] || 0) + 1;
        }
      } catch { /* ignore */ }
    }
    const topInterests = Object.entries(interestMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    return NextResponse.json({
      totalUsers,
      totalSessions,
      avgScore: `${avgScore}%`,
      scoredSessionsCount: scoredSessions.length,
      popularTopics: topicCounts.map(t => ({ topic: t.topic, count: t._count.topic })),
      subjectDistribution: subjectCounts.map(s => ({ subject: s.subject, count: s._count.subject })),
      careerDistribution: careerCounts.map(c => ({ career: c.career, count: c._count.career })),
      topInterests: topInterests.map(([interest, count]) => ({ interest, count })),
      dailySessions: dailySessions.map(d => ({ date: d.date, count: Number(d.count) })),
      recentUsers,
      recentSessions: recentSessions.map(s => ({
        id: s.id,
        topic: s.topic,
        subject: s.subject,
        score: s.score,
        totalQuestions: s.totalQuestions,
        userName: s.user.name,
        userCareer: s.user.career,
        createdAt: s.createdAt,
      })),
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}