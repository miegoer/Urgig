// import "../globals.css";
// import { Home, PromoterUSP, ArtistUSP, Footer, Navbar, AboutUs, OurMission } from "./page";
// import {
//   ClerkLoaded,
//   ClerkLoading,
//   ClerkProvider,
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider
//       appearance={{
//         baseTheme: dark,
//       }}
//     >
//       <html lang="en">
//         <body className="bg-gray-900 text-white">
//           <header>
//             <Navbar />
//           </header>

//           <main>
//             <ClerkLoading>
//               <div className="flex items-center justify-center h-full">
//                 Loading...
//               </div>
//             </ClerkLoading>

//             <ClerkLoaded>
//               {/* Hero Section */}
//               <div className="h-[50vh] flex items-center justify-center">
//                 <Home />
//               </div>

//               {/* Main Content */}
//               <div className="max-w-6xl mx-auto px-4 py-8">
//                 <div className="flex justify-center space-y-4">
//                   <SignedOut>
//                     <div className="flex space-x-4">
//                       <SignInButton
//                         mode="redirect"
//                         className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
//                       >
//                         Sign in
//                       </SignInButton>
//                       <SignUpButton
//                         mode="redirect"
//                         className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
//                       >
//                         Sign up
//                       </SignUpButton>
//                     </div>
//                   </SignedOut>

//                   <SignedIn>
//                     <UserButton />
//                   </SignedIn>
//                 </div>

//                 {/* USP Components */}
//                 <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0 mt-8">
//                   <ArtistUSP />
//                   <PromoterUSP />
//                 </div>
//               </div>

//               {/* About Us and Our Mission Sections */}
//               <AboutUs />
//               <OurMission />

//               {/* Contact Section */}
//               <div id="contact">
//                 {children}
//               </div>
//             </ClerkLoaded>
//           </main>

//           <Footer />
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
