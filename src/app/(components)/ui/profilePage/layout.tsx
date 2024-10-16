"use client";

import FirstCol from "@/app/(components)/ui/profilePage/firstCol";
import ThirdCol from "@/app/(components)/ui/profilePage/ThirdCol";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { getUser, isPublic } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import { Ubuntu } from "next/font/google";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PageOwnerUserContext from "@/app/(context)/PageOwnerUserContext";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { userId } = useTalkSession();
  const { id } = useParams();

  const [pageOwnerUser, setPageOwnerUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  //get user that's 'owner' of the page
  useEffect(() => {
    const checkUser = async () => {
      if (isPublic(pathname) && id) {
        const user = await getUser(id as string);

        //if looking at an artist id, but on /p/ switch it to /a/id...
        if (!isValidProfile(pathname, user.typeOfAccount)) {
          const link = `${redirectToValidProfile(user.typeOfAccount)}/${id}`;
          router.push(link);
          return;
        }
        setPageOwnerUser(user);
      } else {
        // get data of visiting user from Context!
        if (!userId) return;
        setPageOwnerUser(await getUser(userId));
      }
    };
    checkUser();
  }, [userId, router]);

  return (
    <PageOwnerUserContext.Provider value={pageOwnerUser}>
      <div className="flex flex-row">
        <div
          id="mainGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <>
            <div
              id="1stcol"
              style={{ gridColumn: "1 / span 3", gridRow: "2 / span 10" }}
              className="h-[630px] w-[500px] relative"
            >
              <FirstCol />
            </div>
            <div
              id="2ndcol"
              style={{ gridColumn: "4 / span 4", gridRow: "1 / span 4" }}
              className="h-[660px] w-[480px]"
            >
              {children}
            </div>
            <div
              id="3rdcol"
              style={{ gridColumn: "8 / span 3", gridRow: "2 / span 8" }}
              className="z-10 w-[160px] ml-[70px]"
            >
              <ThirdCol />
            </div>
          </>
        </div>
      </div>
    </PageOwnerUserContext.Provider>
  );
}

function isValidProfile(pathname: string, typeOfAccount: string) {
  if (typeOfAccount === "artist" && pathname.includes("/a/")) return true;
  if (typeOfAccount === "promoter" && pathname.includes("/p/")) return true;
  return false;
}
function redirectToValidProfile(typeOfAccount: string) {
  if (typeOfAccount === "artist") return "/a";
  if (typeOfAccount === "promoter") return "/p";
}
