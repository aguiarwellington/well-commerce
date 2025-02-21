import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import navBar from "./components/navBar";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
      <body className={clsx(geistSans.variable, 'bg-slate-700')}>
        {navBar()}
        <main className=" h-screen p-16">{children}</main>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
