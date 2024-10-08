import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Home, Navbar, PromoterUSP, ArtistUSP, Footer } from "./page";
// Clerk integration
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// Clerk themes
import { dark } from "@clerk/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className="bg-gray-900 text-white">
          <header>
            <Navbar />
          </header>

          <main>
            <ClerkLoading>
              <div className="flex items-center justify-center h-full">
                Loading...
              </div>
            </ClerkLoading>

            <ClerkLoaded>
              {/* Hero Section */}
              <div className="h-[50vh] flex items-center justify-center">
                <Home />
              </div>

              {/* Main Content */}
              <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex  justify-center space-y-4">
                  <SignedOut>
                    <SignInButton
                      mode="redirect"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Sign in
                    </SignInButton>
                    <SignUpButton
                      mode="redirect"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Sign up
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>

                {/* USP Components */}
                <div className="flex flex-col items-center space-y-8 mt-8">
                  <ArtistUSP />
                  <PromoterUSP />
                </div>
              </div>

              <div className="">{children}</div>
            </ClerkLoaded>
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
