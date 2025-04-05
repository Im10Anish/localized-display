import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CountryProvider } from "./providers/CountryProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Localized Display App",
  description: "Display date, time, and currency in local formats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CountryProvider>{children}</CountryProvider>
      </body>
    </html>
  );
}
