"use client";

import FirstCol from "@/app/(components)/ui/profilePage/firstCol";
import ThirdCol from "@/app/(components)/ui/profilePage/ThirdCol";
import React from "react";
import { PageOwnerUserProvider } from "@/app/(context)/PageOwnerUserContext";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageOwnerUserProvider>
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
    </PageOwnerUserProvider>
  );
}
