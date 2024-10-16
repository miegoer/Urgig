"use client";

import { createContext, useContext } from "react";
import { User } from "@/types/user";

const PageOwnerUserContext = createContext<User | null>(null);

export function usePageOwnerUser() {
  return useContext(PageOwnerUserContext);
}

export default PageOwnerUserContext;
