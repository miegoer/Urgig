import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';

const processedEvents = new Set<string>();

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET to .env.local');
  }

  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  // check if event was already done
  if (processedEvents.has(svixId)) {
    console.log(`Duplicate event received. Skipping event ID: ${svixId}`);
    return NextResponse.json({ success: true });
  }

  const rawBody = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    // check webhook event
    evt = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;

    const eventType = evt.type;

    // Mark event as done
    processedEvents.add(svixId);

    if (eventType === 'user.updated') {
      const { id } = evt.data;
      const user = await clerkClient.users.getUser(id);

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // if users role was updated reissue token
      if (user.publicMetadata?.role) {
        console.log(`User role updated to: ${user.publicMetadata.role}`);

        const sessionsResponse = await clerkClient.sessions.getSessionList({
          userId: id,
        });

        const sessions = sessionsResponse.data;

        if (sessions.length > 0) {
          const session = sessions[0];
          const updatedToken = await clerkClient.sessions.getToken(
            session.id,
            'default'
          );
          return NextResponse.json({ token: updatedToken });
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Unhandled event type' },
      { status: 400 }
    );
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
