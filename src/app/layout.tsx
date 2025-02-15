import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import navBar from "./components/navBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Well-commerce",
  description: "Next E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        {navBar()}
        <main className="bg-slate-700 h-screen p-16">{children}</main>
      </body>
    </html>
  );
}
