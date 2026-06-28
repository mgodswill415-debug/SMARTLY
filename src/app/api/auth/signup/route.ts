import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

function generateToken(): string {
  return randomBytes(32).toString('hex');
}

function createSession(userId: string): { token: string; expiresAt: Date } {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  return { token, expiresAt };
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, whatsapp, password } = await request.json();
    if (!name || !name.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!email || !email.trim() || !email.includes('@')) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    if (!whatsapp || !whatsapp.trim()) return NextResponse.json({ error: 'WhatsApp number is required' }, { status: 400 });
    if (!password || password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await db.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: { name: name.trim(), email: normalizedEmail, password: hashedPassword, whatsapp: whatsapp.trim(), interests: '[]', career: '' },
    });

    const { token, expiresAt } = createSession(user.id);
    await db.authSession.create({ data: { userId: user.id, token, expiresAt } });

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, whatsapp: user.whatsapp },
      profile: { name: user.name, interests: [], career: '' }, token, isNew: true,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 500 });
  }
}