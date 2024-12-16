import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import HomeFile from "@/pages/components/HomeFile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// Mock the necessary modules
jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("TEST: renders loading spinner initially", async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <HomeFile />
        </QueryClientProvider>
      );
    });
    // Make sure the loader is displayed when loading
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("TEST: renders the page details after fetching data", async () => {
    const mockData = {
      data: {
        data: {
          Title: "חתונה",
          BrideName: "רחל",
          GroomName: "יוסף",
          Day: 12,
          Month: 5,
          Year: 2024,
          Location: "ירושלים",
          Hour: 20,
          Minute: 30,
          Description: "מוזמנים לאירוע מיוחד!",
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockData);

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <HomeFile />
        </QueryClientProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("חתונה")).toBeInTheDocument();
      expect(screen.getByText("רחל & יוסף")).toBeInTheDocument();
      expect(screen.getByText("12/5/2024")).toBeInTheDocument();
      expect(screen.getByText("ירושלים")).toBeInTheDocument();
      expect(screen.getByText("20:30")).toBeInTheDocument();
      expect(screen.getByText("מוזמנים לאירוע מיוחד!")).toBeInTheDocument();
    });
  });

  test("TEST: navigates to RSVP form when the button is clicked ", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <HomeFile />
        </QueryClientProvider>
      );
    });

    // חפש את הכפתור לפי ה-id שלו (לדוגמה, נניח שה-id הוא 'rsvp-button')
    const button = screen.getByTestId("rsvp-button");
    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith("RSVPForm");
  });


  test('TEST: displays loader when button is clicked', async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <HomeFile />
        </QueryClientProvider>
      );
    });

    const button = screen.getByText('לאישור ההגעה');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

});
