import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "../app/components/NavBar";
import Hydrate from "../app/components/Hydrate"; 



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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={geistSans.variable + " bg-slate-700"}>
          <Hydrate>
            <NavBar /> 
            <main className="p-16 pt-24 h-screen">{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
