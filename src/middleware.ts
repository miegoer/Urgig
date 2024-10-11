import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

<<<<<<< HEAD
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/api(.*)',
]);
=======
// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect()
// })

// other way around than above
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/", "/api/(.*)"]);
>>>>>>> origin/main

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    '/(api|trpc)(.*)',
  ],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import { clerkClient } from '@clerk/nextjs/server'; // To fetch user data

// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)',
//   '/sign-up(.*)',
//   '/',
//   '/api/clerk(.*)',
// ]);

// export default clerkMiddleware(async (auth, request) => {
//   if (isPublicRoute(request)) {
//     return NextResponse.next();
//   }

//   // userId from auth session
//   const { userId } = auth();

//   // if no userId, redirect to sign-in
//   if (!userId) {
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }

//   // getdata from Clerk
//   const user = await clerkClient.users.getUser(userId);

//   // get role
//   const role = user.publicMetadata?.role;
//   console.log(role);

//   // "role-based access control"
//   if (role === 'Artist') {
//     return NextResponse.next();
//   } else if (role === 'Promoter') {
//     return NextResponse.redirect(new URL('/hell', request.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };
