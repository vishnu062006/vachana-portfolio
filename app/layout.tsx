import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vachana M H | Full Stack Web Developer",
  description:
    "Portfolio of Vachana M H — Full Stack Web Developer building scalable digital experiences with elegant engineering. Specializing in React, Next.js, Spring Boot, and modern web technologies.",
  keywords: [
    "Vachana M H",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Spring Boot",
    "TypeScript",
    "Portfolio",
    "BMS College of Engineering",
  ],
  authors: [{ name: "Vachana M H" }],
  creator: "Vachana M H",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Vachana M H | Full Stack Web Developer",
    description:
      "Building scalable digital experiences with elegant engineering.",
    siteName: "Vachana M H Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vachana M H | Full Stack Web Developer",
    description:
      "Building scalable digital experiences with elegant engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-gray-950 text-gray-200 antialiased">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
