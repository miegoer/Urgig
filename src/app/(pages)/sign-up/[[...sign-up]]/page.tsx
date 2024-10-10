import { SignUp } from '@clerk/nextjs';
import "../../globals.css";
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/registration" // Redirect after successful signup
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#ffffff",
            colorBackground: "#1a1a1a",
            colorInputBackground: "#2d2d2d",
            colorTextSecondary: "#cccccc",
            borderRadius: "0.5rem",
          },
          elements: {
            card: "bg-gray-800 border border-gray-700 shadow-lg",
            headerTitle: "text-white text-2xl font-bold",
            headerSubtitle: "text-gray-400",
            formFieldInput: "bg-gray-700 text-white placeholder-gray-400",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            footer: "bg-gray-900 text-gray-400",
          },
        }}
      />
    </div>
  );
}