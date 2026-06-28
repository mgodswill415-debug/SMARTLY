import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Update user profile (called after onboarding)
export async function POST(request: NextRequest) {
  try {
    const { name, interests, career, deviceId } = await request.json();

    if (!name || !career) {
      return NextResponse.json({ error: 'Name and career required' }, { status: 400 });
    }

    let user;

    // Try to find by any ID (either auth user ID or legacy device ID)
    if (deviceId) {
      user = await db.user.findUnique({ where: { id: deviceId } });
    }

    // Try by name+career if no match
    if (!user) {
      user = await db.user.findFirst({ where: { name, career } });
    }

    if (!user) {
      // Create new user (fallback for non-auth users)
      user = await db.user.create({
        data: {
          name,
          email: `${name.toLowerCase().replace(/\s+/g, '.')}@smartly.local`,
          whatsapp: '0000000000',
          interests: JSON.stringify(interests || []),
          career,
          deviceFingerprint: deviceId || null,
        },
      });
    } else {
      // Update existing user's profile
      user = await db.user.update({
        where: { id: user.id },
        data: { name, interests: JSON.stringify(interests || []), career },
      });
    }

    return NextResponse.json({ id: user.id, name: user.name });
  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}