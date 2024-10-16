"use client";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavAdminMenu() {
  const [realUserId, setRealUserId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { setUserId, setUserType, userId } = useTalkSession();

  const pathname = usePathname(); // Use usePathname instead of useRouter
  const searchParams = useSearchParams(); // Get the search (query) params

  // Ensure the component is mounted before using the router
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const becomeArtist = () => {
    setUserType("artist");
  };

  const becomePromoter = () => {
    setUserType("promoter");
  };

  const impersonate = () => {
    if (!isMounted) return; // Wait until the component is mounted before accessing the router

    // Check if the pathname starts with either /a/profile/ or /p/profile/
    if (pathname.startsWith("/a/profile/") || pathname.startsWith("/p/profile/")) {
      const id = pathname.split("/").pop(); // Get the last part of the path as the ID
      console.log({ id });
      console.log({ pathname });
      if (id) {
        setRealUserId(userId);
        setUserId(id); // Impersonate based on the extracted id
      } else {
        alert("Invalid ID for impersonation.");
      }
    } else {
      alert("You're not on an Artist's / Promoter's public profile");
    }
  };

  const returnBack = () => {
    if (realUserId) {
      setUserId(realUserId);
      setRealUserId(null);
    } else {
      alert("No original user ID saved.");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Admin Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="artist" onClick={becomeArtist}>
          Become Artist
        </DropdownItem>
        <DropdownItem key="promoter" onClick={becomePromoter}>
          Become Promoter
        </DropdownItem>
        <DropdownItem key="impersonate" onClick={impersonate}>
          Impersonate
        </DropdownItem>
        <DropdownItem key="returnBack" onClick={returnBack}>
          Return Back to your account
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
