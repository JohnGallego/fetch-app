import AppNavBar from "@/components/app-nav-bar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Comic_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"], // Include regular and bold weights
  subsets: ["latin"],
  variable: "--font-comic-neue", // Define a CSS variable for the font
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
      <head>
        <script
          src="https://kit.fontawesome.com/8cfd2e2d7f.js"
          crossOrigin="anonymous"
          async
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comicNeue.variable} antialiased`}
      >
        <AppNavBar />

        {children}

        <Toaster />
      </body>
    </html>
  );
}
