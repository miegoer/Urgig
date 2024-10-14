'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import GigPhoto1 from '/public/laloOriginalPhotos/LaloGigPhoto1.png';
import GigPhoto2 from '/public/laloOriginalPhotos/LaloGigPhoto2.png';
import GigPhoto3 from '/public/laloOriginalPhotos/LaloGigPhoto3.png';
import GigPhoto4 from '/public/laloOriginalPhotos/LaloGigPhoto4.png';
import DJPhoto from "/public/unsplash-dj-photo.png";
import "../(pages)/globals.css";
import './page.css'
import { useUser } from "@clerk/nextjs";

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { src: DJPhoto, alt: 'Slide 1', width: 600, height: 400},
    { src: GigPhoto1, alt: 'Slide 2', width: 600, height: 400 },
    { src: GigPhoto2, alt: 'Slide 3', width: 600, height: 400}
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="z-10 relative items-center h-full w-full object-cover priority={true}">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`mySlides fade ${index === slideIndex ? 'block' : 'hidden'}`}
        >
          <Image src={slide.src} className="w-[100%]" alt={slide.alt} />
        </div>
      ))}
    </div>
  );
}

// Home Component with Hero Image and Overlay
export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push('/dashboard');
    }
  }, [isLoaded, user, router]);

  return (
    <div className="z-11 mt-[100px] flex items-center justify-center h-full w-full">
        <Slideshow/>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-60"></div>
      <div className="z-20 absolute text-center px-4">
        <h1 className="text-5xl font-bold text-[#cefb50] tracking-[1px]">Welcome to UrGig!</h1>
        <p className="mt-8 text-base bg-[#cefb50] text-black lowercase tracking-[1px]">Connecting Artists and Promoters seamlessly</p>
      </div>
      </div>
  );
}

// Navbar Component
export function Navbar() {
  return (
    <nav className="z-50 absolute bg-[#06051f] w-full">
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
              className="text-[#cefb50] hover:text-white px-3 py-2 rounded-md font-medium block text-[11px] tracking-[1.5px] uppercase mt-[3px] mb-[8px] text-center"
            >
              Home
            </a>
            <a
              href="#about-us"
              className="text-[#cefb50] hover:text-white px-3 py-2 rounded-md font-medium block text-[11px] tracking-[1.5px] uppercase mt-[3px] mb-[8px] text-center"
            >
              About Us
            </a>
            <a
              href="#our-mission"
              className="text-[#cefb50] hover:text-white px-3 py-2 rounded-md font-medium block text-[11px] tracking-[1.5px] uppercase mt-[3px] mb-[8px] text-center"
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
    <div className="z-30 bg-gradient-to-r from-black to-gray-900 opacity-80 text-gray-100 px-5 py-5 rounded-[30px] mr-[10px] md:w-[48%] text-center">
      <h2 className="text-xl font-semibold mb-4 uppercase tracking-[1px]">For Artists</h2>
      <p className="text-base tracking-[1px]">
        Showcase your talent, connect with promoters, and get more gigs. Create your profile, set
        your availability, and let opportunities come to you.
      </p>
    </div>
  );
}
// PromoterUSP Component
export function PromoterUSP() {
  return (
    <div className="z-30 bg-gradient-to-l from-black to-gray-900 opacity-80 text-gray-100 px-5 py-5 rounded-[30px] ml-[10px] w-full md:w-[48%] text-center">
      <h2 className="text-xl font-semibold uppercase mb-4 tracking-[1px]">For Promoters</h2>
      <p className="text-base tracking-[1px]">
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
      className="bg-gradient-to-b from-[#06051f] to-gray-800 text-gray-100 py-12"
    >
      <div className="max-w-6xl mt-[140px] mx-auto px-4 text-center">
        <div className="flex flex-row justify-center">
          <Image src={GigPhoto3} height={600} width={800} alt="Photo by Lalo Coesel" className="mr-[30px]"/>
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-6 uppercase text-[#cefb50] mb-[40px] tracking-[1px]">About Us</h2>
            <p className="text-lg mb-4 tracking-[1px]">
            UrGig is a decentralized platform that connects talented artists with event promoters,
            simplifying the booking process and allowing creativity to shine.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Our Mission Component
export function OurMission() {
  return (
    <section
      id="our-mission"
      className="bg-gradient-to-b to-[#06051f] from-gray-800 text-gray-100 py-12"
    >
      <div className="max-w-6xl mt-[60px] mx-auto px-4 text-center">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-6 uppercase text-[#cefb50] mb-[40px] tracking-[1px]">Our Mission</h2>
          <p className="text-lg mb-[80px] tracking-[1px]">
          Our mission is to empower artists by giving them more control over their bookings and to
          help promoters find the perfect talent for their events. Join us and make your next gig
          unforgettable!
          </p>
          </div>
          <Image src={GigPhoto4} height={600} width={800} alt="Photo by Lalo Coesel" className="ml-[30px] -scale-x-100"/>
        </div>
      </div>
    </section>
  );
}

// Call to Action Component
// export function CTA() {
//   return (
//     <div className="flex flex-row justify-center">
//       <button className="rounded-[10px] text-center text-[black] mr-[120px] mt-[35px] z-50 absolute py-2 px-5 bg-[#cefb50] uppercase text-sm">
//         Register
//       </button>
//       <button className="rounded-[10px] text-center text-[black] ml-[120px] mt-[35px] z-50 absolute py-2 px-5 bg-[#cefb50] uppercase text-sm">
//         Log In
//       </button>
//     </div>
//   )
// }

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
