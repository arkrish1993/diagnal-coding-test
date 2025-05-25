import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: "200",
});

export const metadata: Metadata = {
  title: "Diagnal Content Listing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titillium.variable} text-white font-titillium antialiased bg-[#171717] mb-4`}
      >
        {children}
      </body>
    </html>
  );
}
