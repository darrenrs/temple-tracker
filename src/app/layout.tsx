import type { Metadata } from "next";
import { Sedan } from "next/font/google";
import "@/app/globals.css";

const font = Sedan({ subsets: ["latin"], weight: ['400'] });

export const metadata: Metadata = {
  title: "Temple Tracker",
  description: "Keep track of your visits to holy temples of the Church of Jesus Christ of Latter-day Saints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
