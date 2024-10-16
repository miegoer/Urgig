import { screen } from "@testing-library/react";
import Page from "@/app/(pages)/(main)/dashboard/page";
import "@testing-library/jest-dom";
import { render } from "./test-utils";

jest.mock("next/navigation", () => ({
  useRouter: () => {},
  usePathname: () => "localhost:3000/dashboard",
  useSearchParams: () => [],
}));


jest.mock('@/app/(components)/ui/dashboard/quickstats', () => () => (
  <div>QuickStats Component</div>
));
jest.mock('@/app/(components)/ui/dashboard/notifications', () => () => (
  <div>Notifications Component</div>
));
jest.mock('@/app/(components)/ui/dashboard/messages', () => () => (
  <div>Messages Component</div>
));
jest.mock('@/app/(components)/ui/dashboard/userinfo', () => () => (
  <div>UserInfo Component</div>
));
jest.mock('@/app/(components)/ui/dashboard/EventsList', () => () => (
  <div>EventsList Component</div>
));



describe("Dashboard", () => {
  it("should contain 5 different components", () => {
    render(<Page children = { null}/>);

    expect(screen.getByText(/QuickStats/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Messages/i)).toBeInTheDocument();
    expect(screen.getByText(/UserInfo/i)).toBeInTheDocument();
    expect(screen.getByText(/EventsList/i)).toBeInTheDocument();
      });

  it("hallo", () => {
    render(
      // <TalkSessionContext.Provider value={{ session: ""}}>
      <Page children={null} />
    );
    // </TalkSessionContext.Provider>)


  });
});
