import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import Page from "@/app/(client)/(routes)/RSVPForm/page";
import "@testing-library/jest-dom";

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mocking axios
jest.mock("axios");

// הגדרת ה QueryClient לצורך שימוש ב React Query
const queryClient = new QueryClient();

describe("Page Component Tests", () => {
  // 1. בדיקה שהטופס נטען כראוי

  it("renders form inputs and button", async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Page />
        </QueryClientProvider>
      );
    });

    // בדיקת שדות הטופס
    await waitFor(() => {
      expect(screen.getByPlaceholderText("שם")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("name@gmail.com")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("012-345-6789")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
    });
    await waitFor(() => {
      // בדיקת כפתור ההגשה
      expect(screen.getByText("אישור")).toBeInTheDocument();
    });
  });

  // // 2. בדיקה להזנת טקסט
  it("allows user to enter text", async () => {
    await act(async()=>{

      render(
        <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
  })
  await waitFor(() => {
    // הזנה לשדה "שם"
    fireEvent.change(screen.getByPlaceholderText("שם"), { target: { value: "John Doe" } });
    expect(screen.getByPlaceholderText("שם")).toHaveValue("John Doe");

    // הזנה לשדה "אימייל"
    fireEvent.change(screen.getByPlaceholderText("name@gmail.com"), { target: { value: "john.doe@example.com" } });
    expect(screen.getByPlaceholderText("name@gmail.com")).toHaveValue("john.doe@example.com");

    // הזנה לשדה "טל"
    fireEvent.change(screen.getByPlaceholderText("012-345-6789"), { target: { value: 1234567890 } });
    expect(screen.getByPlaceholderText("012-345-6789")).toHaveValue(1234567890);

    // הזנה לשדה "כמות מגיעים"
    fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: 3 } });
    expect(screen.getByPlaceholderText("0")).toHaveValue(3);
  })
  });

  // // 3. בדיקה לשליחת הטופס
  // it("submits the form and handles success response", async () => {
  //   // Mock axios.post
  //   axios.post = jest.fn().mockResolvedValue({
  //     data: { status: 201 }
  //   });

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Page />
  //     </QueryClientProvider>
  //   );

  //   // הזנה של נתונים
  //   fireEvent.change(screen.getByPlaceholderText("שם"), { target: { value: "John Doe" } });
  //   fireEvent.change(screen.getByPlaceholderText("name@gmail.com"), { target: { value: "john.doe@example.com" } });
  //   fireEvent.change(screen.getByPlaceholderText("012-345-6789"), { target: { value: "1234567890" } });
  //   fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: "3" } });

  //   // שליחה
  //   fireEvent.click(screen.getByText("אישור"));

  //   await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

  //   // בדיקה אם נעשתה הפנייה לדף "TanksFile"
  //   expect(useRouter().push).toHaveBeenCalledWith("/TanksFile");
  // });

  // // 4. בדיקה אם יש שגיאה בתהליך השליחה
  // it("handles form submission error", async () => {
  //   axios.post = jest.fn().mockRejectedValue(new Error("Request failed"));

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Page />
  //     </QueryClientProvider>
  //   );

  //   // הזנה של נתונים
  //   fireEvent.change(screen.getByPlaceholderText("שם"), { target: { value: "John Doe" } });
  //   fireEvent.change(screen.getByPlaceholderText("name@gmail.com"), { target: { value: "john.doe@example.com" } });
  //   fireEvent.change(screen.getByPlaceholderText("012-345-6789"), { target: { value: "1234567890" } });
  //   fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: "3" } });

  //   // שליחה
  //   fireEvent.click(screen.getByText("אישור"));

  //   await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

  //   // בדיקה שהתפיעה שגיאה
  //   expect(screen.getByText("פרטיך כבר קיימים במערכת")).toBeInTheDocument();
  // });

  // // 5. בדיקה אם המהודע המסתובב מוצג במהלך השליחה
  // it("shows loading spinner during form submission", () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Page />
  //     </QueryClientProvider>
  //   );

  //   fireEvent.change(screen.getByPlaceholderText("שם"), { target: { value: "John Doe" } });
  //   fireEvent.change(screen.getByPlaceholderText("name@gmail.com"), { target: { value: "john.doe@example.com" } });
  //   fireEvent.change(screen.getByPlaceholderText("012-345-6789"), { target: { value: "1234567890" } });
  //   fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: "3" } });

  //   fireEvent.click(screen.getByText("אישור"));

  //   // בדיקה אם המהודע המסתובב מוצג
  //   expect(screen.getByTestId("loader")).toBeInTheDocument();
  // });
});
