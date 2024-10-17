"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { getUser, isPublic } from "@/app/utils/userUtils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";

interface PageOwnerUserContextProps {
  pageOwnerUser: User | null;
}

const PageOwnerUserContext = createContext<PageOwnerUserContextProps | undefined>(undefined);

export const usePageOwnerUser = () => {
  const context = useContext(PageOwnerUserContext);
  if (!context) {
    throw new Error("usePageOwnerUser must be used within a PageOwnerUserProvider");
  }
  return context;
};

export const PageOwnerUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId } = useTalkSession();
  const { id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pageOwnerUser, setPageOwnerUser] = useState<User | null>(null);

  // Fetch the page owner user
  useEffect(() => {
    const fetchPageOwnerUser = async () => {
      if (isPublic(pathname) && id) {
        const user = await getUser(id as string);

        // Redirect if the profile type doesn't match the URL
        if (!isValidProfile(pathname, user.typeOfAccount)) {
          const link = `${redirectToValidProfile(user.typeOfAccount)}/${id}`;
          router.push(link);
          return;
        }
        setPageOwnerUser(user);
      } else {
        // Get data of the visiting user from Context
        if (!userId) return;
        setPageOwnerUser(await getUser(userId));
      }
    };
    fetchPageOwnerUser();
  }, [userId, id, pathname, router]);

  return (
    <PageOwnerUserContext.Provider value={{ pageOwnerUser }}>
      {children}
    </PageOwnerUserContext.Provider>
  );
};

function isValidProfile(pathname: string, typeOfAccount: string) {
  if (typeOfAccount === "artist" && pathname.includes("/a/")) return true;
  if (typeOfAccount === "promoter" && pathname.includes("/p/")) return true;
  return false;
}

function redirectToValidProfile(typeOfAccount: string) {
  if (typeOfAccount === "artist") return "/a";
  if (typeOfAccount === "promoter") return "/p";
}
