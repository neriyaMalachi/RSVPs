import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/pages/components/NavBar";
import React from "react";

export const metadata: Metadata = {
  title: "אישור הגעה",
  description: "תוכנה לאישורי הגעה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
