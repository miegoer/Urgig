import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import "../globals.css";

export default function SignInPage() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      {/* Background Image */}
      <Image
        src="/Hero-image.webp"
        alt="Hero"
        fill
        className="object-cover opacity-30"
        priority={true}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
      {/* Clerk Sign-In Component */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-md">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
}
