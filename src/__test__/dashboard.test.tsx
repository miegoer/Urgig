import { screen } from "@testing-library/react";
import Page from "@/app/(pages)/(main)/dashboard/page";
import "@testing-library/jest-dom";
import { render } from "./test-utils";

jest.mock("next/navigation", () => ({
  useRouter: () => {},
  usePathname: () => "localhost:3000/dashboard",
  useSearchParams: () => [],
}));




describe("Dashboard", () => {
  it("should contain 5 different components", () => {
    render(<Page children = { null}/>);



  });
});
