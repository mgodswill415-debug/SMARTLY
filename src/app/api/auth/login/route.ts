import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

function generateToken(): string {
  return randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !email.trim()) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    if (!password) return NextResponse.json({ error: 'Password is required' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await db.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await db.authSession.create({ data: { userId: user.id, token, expiresAt } });
    await db.authSession.deleteMany({ where: { userId: user.id, expiresAt: { lt: new Date() } } });

    let parsedInterests: string[] = [];
    try { parsedInterests = JSON.parse(user.interests); } catch {}
    const hasProfile = parsedInterests.length > 0 && !!user.career;

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, whatsapp: user.whatsapp },
      profile: { name: user.name, interests: parsedInterests, career: user.career },
      token, isNew: false, hasProfile,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}