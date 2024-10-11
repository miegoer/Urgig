import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET to .env.local');
  }

  // svix headers
  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- missing svix headers', {
      status: 400,
    });
  }

  const rawBody = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;

    const eventType = evt.type;

    const payload = JSON.parse(rawBody);

    if (eventType === 'user.updated') {
      const { id } = evt.data;
      const user = await clerkClient.users.getUser(id);

      // if user's role was updated, reissue the token
      if (user?.publicMetadata?.role) {
        const session = await clerkClient.sessions.getSession(id);
        if (session) {
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
      { error: 'Event type not handled' },
      { status: 400 }
    );
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// import { Webhook } from 'svix';
// import { clerkClient } from '@clerk/nextjs/server';
// import { headers } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { WebhookEvent } from '@clerk/nextjs/server';

// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error('add webhook secret to .env.local');
//   }

//   // svix headers
//   const headerPayload = headers();
//   const svixId = headerPayload.get('svix-id');
//   const svixTimestamp = headerPayload.get('svix-timestamp');
//   const svixSignature = headerPayload.get('svix-signature');

//   if (!svixId || !svixTimestamp || !svixSignature) {
//     return new Response('Error occurred -- missing svix headers', {
//       status: 400,
//     });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const rawBody = await req.text();

//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt: WebhookEvent;

//   try {
//     console.log('WEBHOOK_SECRET:', WEBHOOK_SECRET);
//     evt = wh.verify(rawBody, {
//       'svix-id': svixId,
//       'svix-timestamp': svixTimestamp,
//       'svix-signature': svixSignature,
//     }) as WebhookEvent;

//     const eventType = evt.type;

//     if (eventType === 'user.updated') {
//       const { id } = evt.data;
//       const user = await clerkClient.users.getUser(id);

//       if (user?.publicMetadata?.role) {
//         const session = await clerkClient.sessions.getSession(id);
//         if (session) {
//           const updatedToken = await clerkClient.sessions.getToken(
//             session.id,
//             'default'
//           );
//           return NextResponse.json({ token: updatedToken });
//         }
//       }
//       return NextResponse.json({ success: true });
//     }

//     return NextResponse.json(
//       { error: 'Event type not handled' },
//       { status: 400 }
//     );
//   } catch (err) {
//     console.error('Webhook verification failed:', err);
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }
// }
