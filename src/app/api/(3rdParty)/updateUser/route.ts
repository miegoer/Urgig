import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const { role, userId } = await req.json();

  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update metadata' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { clerkClient } from '@clerk/nextjs/server';

// export async function POST(req: Request) {
//   const { typeOfAccount, userId } = await req.json();

//   try {
//     // update public metadata with role in Clerk (typeofaccount)
//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: { role: typeOfAccount },
//     });
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error updating metadata:', error);
//     return NextResponse.json(
//       { error: 'Failed to update metadata' },
//       { status: 500 }
//     );
//   }
// }
