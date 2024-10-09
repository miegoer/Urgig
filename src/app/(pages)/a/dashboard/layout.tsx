import NavBarA from "@/app/(components)/ui/navBarA";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarA />
      {children}
    </>
  );
}
