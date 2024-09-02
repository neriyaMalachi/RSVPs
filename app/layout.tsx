import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBarForClient from "@/pages/components/NavBarForClient";
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <NavBarForClient/>
        {children}
        </body>
    </html>
  );
}
