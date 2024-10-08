import Image from "next/image";

// Home Component with Hero Image
export function Home() {
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <Image
        src="/Hero-image.webp"
        alt="Hero"
        fill
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <div className="absolute text-4xl text-lightest-gray">
        Welcome to UrGig!
      </div>
    </div>
  );
}

// Navbar Component
export function Navbar() {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-white">
                Logo
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a href="/" className="text-white hover:bg-white hover:text-black rounded lg">
                Home
              </a>
              <a href="/about-us" className="text-white hover:bg-white hover:text-black rounded lg">
                About us
              </a>
              <a href="/contact" className="text-white hover:bg-white hover:text-black rounded lg">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Artist USP Component
export function ArtistUSP() {
  return (
    <div className="bg-gray-800 text-lightest-gray p-6 rounded-lg mt-4 max-w-xl text-center">
      <h2 className="text-2xl font-semibold mb-2">For Artists</h2>
      <p className="text-sm">
        Showcase your talent, connect with promoters, and get more gigs.
        Create your profile, set your availability, and let opportunities come to you.
      </p>
    </div>
  );
}

// Promoter USP Component
export function PromoterUSP() {
  return (
    <div className="bg-gray-800 text-lightest-gray p-6 rounded-lg mt-4 max-w-xl text-center">
      <h2 className="text-2xl font-semibold mb-2">For Promoters</h2>
      <p className="text-sm">
        Discover new artists, book them easily, and bring your events to life.
        Access a curated pool of talent to find the perfect match for your event.
      </p>
    </div>
  );
}

// Footer Component
export function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-white">
              © 2024 UrGig. All rights reserved.
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a href="/privacy-policy" className="text-white hover:bg-white hover:text-black rounded lg">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-white hover:bg-white hover:text-black rounded lg">
                Terms of Service
              </a>
              <a href="/contact" className="text-white hover:bg-white hover:text-black rounded lg">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
