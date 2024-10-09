'use client';

import Nav from "@/app/ui/nav";
import { usePathname } from 'next/navigation';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  return (
    <div className="grid grid-cols-12">
      {!pathname.startsWith('/myprofile') ? <Nav /> : null}
      <div className="row-[2/_span_9]">
        {children}
      </div>
    </div>
  );
}