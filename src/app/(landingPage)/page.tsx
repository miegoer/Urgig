import Image from "next/image";
import "../(pages)/globals.css";

// Home Component with Hero Image and Overlay
export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <Image src="/Hero-image.webp" alt="Hero" fill className="object-cover" priority={true} />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-60"></div>
      <div className="absolute text-center px-4">
        <h1 className="text-5xl font-bold text-white">Welcome to UrGig!</h1>
        <p className="mt-4 text-xl text-gray-200">Connecting Artists and Promoters seamlessly.</p>
      </div>
    </div>
  );
}

// Navbar Component
export function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-white font-bold text-xl">
              UrGig
            </a>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#about-us"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </a>
            <a
              href="#our-mission"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Our Mission
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ArtistUSP Component
export function ArtistUSP() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 p-6 rounded-lg w-full md:w-[48%] text-center">
      <h2 className="text-2xl font-semibold mb-4">For Artists</h2>
      <p className="text-base">
        Showcase your talent, connect with promoters, and get more gigs. Create your profile, set
        your availability, and let opportunities come to you.
      </p>
    </div>
  );
}
// PromoterUSP Component
export function PromoterUSP() {
  return (
    <div className="bg-gradient-to-l from-gray-800 to-gray-900 text-gray-100 p-6 rounded-lg w-full md:w-[48%] text-center">
      <h2 className="text-2xl font-semibold mb-4">For Promoters</h2>
      <p className="text-base">
        Discover new artists, book them easily, and bring your events to life. Access a curated pool
        of talent to find the perfect match for your event.
      </p>
    </div>
  );
}

// AboutUs Component
export function AboutUs() {
  return (
    <section
      id="about-us"
      className="bg-gradient-to-b from-gray-800 to-gray-700 text-gray-100 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>
        <p className="text-lg mb-4">
          UrGig is a decentralized platform that connects talented artists with event promoters,
          simplifying the booking process and allowing creativity to shine.
        </p>
      </div>
    </section>
  );
}

// Our Mission Component
export function OurMission() {
  return (
    <section
      id="our-mission"
      className="bg-gradient-to-b from-gray-700 to-gray-800 text-gray-100 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-lg">
          Our mission is to empower artists by giving them more control over their bookings and to
          help promoters find the perfect talent for their events. Join us and make your next gig
          unforgettable!
        </p>
      </div>
    </section>
  );
}

// Footer Component
export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm">© 2024 UrGig. All rights reserved.</div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-4">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
