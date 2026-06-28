import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Log a lesson session + quiz score
export async function POST(request: NextRequest) {
  try {
    const { userId, topic, subject, interestUsed, careerUsed, score, totalQuestions } = await request.json();

    if (!userId || !topic) {
      return NextResponse.json({ error: 'userId and topic required' }, { status: 400 });
    }

    const session = await db.lessonSession.create({
      data: {
        userId,
        topic,
        subject: subject || 'Unknown',
        interestUsed: interestUsed || '',
        careerUsed: careerUsed || '',
        score: score ?? null,
        totalQuestions: totalQuestions ?? null,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Lesson API error:', error);
    return NextResponse.json({ error: 'Failed to log lesson' }, { status: 500 });
  }
}