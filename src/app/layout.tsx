import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Hydrate from "./components/Hydrate"; // ⬅️ Importamos o `Hydrate.tsx`
import NavBar from "./components/NavBar"


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
            <NavBar /> {/* ⬅️ Agora `NavBar` só será renderizado no cliente */}
            <main className="p-16 pt-24 h-screen">{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
