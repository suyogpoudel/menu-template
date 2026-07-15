import type { Metadata } from "next";
import { Geist_Mono, Manrope, EB_Garamond, Anton } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";

const ebGaramondHeading = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meetho | Menu App",
  description:
    "This is a menu app template designed to serve as the demo application for cafes and restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        geistMono.variable,
        anton.variable,
        manrope.variable,
        ebGaramondHeading.variable,
        "antialiased h-full font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
