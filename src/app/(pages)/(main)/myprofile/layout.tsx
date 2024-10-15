"use client";

import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto 1fr",
      }}
    >
      {children}
    </div>
  );
}
