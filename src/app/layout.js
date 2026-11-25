
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VELOR OUTFITS | Modern Fashion",
  description:
    "Discover modern fashion, premium shirts and stylish pants at VELOR OUTFITS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>

        {children}

        <Footer />
      </body>
    </html>
  );
}
