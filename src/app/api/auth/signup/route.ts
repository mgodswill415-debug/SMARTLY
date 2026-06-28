import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomBytes } from 'crypto';

function generateToken(): string {
  return randomBytes(32).toString('hex');
}

function createSession(userId: string): { token: string; expiresAt: Date } {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days
  return { token, expiresAt };
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, whatsapp } = await request.json();

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!whatsapp || !whatsapp.trim()) {
      return NextResponse.json({ error: 'WhatsApp number is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedWhatsapp = whatsapp.trim();

    // Check if user already exists
    const existing = await db.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      // User exists — create a new session (auto-login)
      const { token, expiresAt } = createSession(existing.id);
      await db.authSession.create({
        data: { userId: existing.id, token, expiresAt },
      });

      // Clean old expired sessions
      await db.authSession.deleteMany({
        where: { userId: existing.id, expiresAt: { lt: new Date() } },
      });

      let parsedInterests: string[] = [];
      try { parsedInterests = JSON.parse(existing.interests); } catch { /* ignore */ }

      return NextResponse.json({
        user: { id: existing.id, name: existing.name, email: existing.email, whatsapp: existing.whatsapp },
        profile: { name: existing.name, interests: parsedInterests, career: existing.career },
        token,
        isNew: false,
        hasProfile: parsedInterests.length > 0 && !!existing.career,
      });
    }

    // Create new user
    const user = await db.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        whatsapp: normalizedWhatsapp,
        interests: '[]',
        career: '',
      },
    });

    const { token, expiresAt } = createSession(user.id);
    await db.authSession.create({
      data: { userId: user.id, token, expiresAt },
    });

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, whatsapp: user.whatsapp },
      profile: { name: user.name, interests: [], career: '' },
      token,
      isNew: true,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 500 });
  }
}