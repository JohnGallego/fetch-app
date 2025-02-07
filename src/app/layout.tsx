import AppNavBar from "@/components/app-nav-bar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Comic_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

export const metadata: Metadata = {
  title: "Pawfect Match",
  description: "Finding your furry soulmate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comicNeue.variable} container h-screen min-h-[600px] min-w-[325px] mx-auto flex flex-col antialiased`}
      >
        <AppNavBar />

        {children}

        <Toaster />
      </body>
    </html>
  );
}
