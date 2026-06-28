import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomBytes } from 'crypto';

function generateToken(): string {
  return randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { email, whatsapp } = await request.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!whatsapp || !whatsapp.trim()) {
      return NextResponse.json({ error: 'WhatsApp number is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedWhatsapp = whatsapp.trim();

    // Find user by email AND whatsapp
    const user = await db.user.findFirst({
      where: { email: normalizedEmail, whatsapp: normalizedWhatsapp },
    });

    if (!user) {
      return NextResponse.json({ error: 'Account not found. Check your email and WhatsApp number.' }, { status: 404 });
    }

    // Create session
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await db.authSession.create({
      data: { userId: user.id, token, expiresAt },
    });

    // Clean old expired sessions
    await db.authSession.deleteMany({
      where: { userId: user.id, expiresAt: { lt: new Date() } },
    });

    // Parse interests
    let parsedInterests: string[] = [];
    try { parsedInterests = JSON.parse(user.interests); } catch { /* ignore */ }

    const hasProfile = parsedInterests.length > 0 && !!user.career;

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, whatsapp: user.whatsapp },
      profile: { name: user.name, interests: parsedInterests, career: user.career },
      token,
      isNew: false,
      hasProfile,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}