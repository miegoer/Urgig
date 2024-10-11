import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { sessionId } = getAuth(req);

  if (!sessionId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // new token with updated metadata
  const token = await clerkClient.sessions.getToken(sessionId, 'default');

  return NextResponse.json({ token });
}
