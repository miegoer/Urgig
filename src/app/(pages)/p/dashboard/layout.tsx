import NavBarP from "@/app/(components)/ui/navBarP";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarP />
      {children}
    </>
  );
}
