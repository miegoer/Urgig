import { screen , waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "./test-utils";
import EventsList from "@/app/(components)/ui/dashboard/EventsList";
import { fetchAndTransformEvents } from "@/app/utils/eventsUtils";

jest.mock("next/navigation", () => ({
  useRouter: () => {},
  usePathname: () => "localhost:3000/dashboard",
  useSearchParams: () => [],
}));

const mockEvents = [
  { _id: "1", name: "Concert 1", dateD: "12", dateM: "Oct", time: "6 PM", imageURL: "http://example.com/image1.jpg" },
  { _id: "2", name: "Concert 2", dateD: "13", dateM: "Oct", time: "8 PM", imageURL: "http://example.com/image2.jpg" },
];

describe("EventsList", () => {

  beforeEach(() => {
    (fetchAndTransformEvents as jest.Mock)
      .mockResolvedValue([mockEvents, []]);
  });

  it("renders upcoming events correctly", async () => {
    render(<EventsList />);

    // Utiliza waitFor para esperar que los eventos se carguen
    await screen.findByText("Concert 1"); // Espera que "Concert 1" esté en el DOM

    // Verifica que los eventos estén presentes
    expect(screen.getByText("Concert 1")).toBeInTheDocument();
    expect(screen.getByText("Concert 2")).toBeInTheDocument();
  });
});
