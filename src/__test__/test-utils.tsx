import React from "react";
import { render } from "@testing-library/react";
import { TalkSessionProvider } from "@/app/(context)/TalkSessionContext";
// import { ClerkProvider } from "@clerk/nextjs";

const ClerkProvider = jest.fn()

const AllTheProviders = ({ children }: any) => {
  return <ClerkProvider><TalkSessionProvider>{children}</TalkSessionProvider></ClerkProvider>;
};

const customRender = (ui: any) => render(ui, { wrapper: AllTheProviders });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
