import Navbar from '@/app/components/Navbar';
import { auth } from '@/auth';
import { User } from '@auth/core/types';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ['400']
});

export const metadata: Metadata = {
  title: "Temple Tracker",
  description: "Keep track of your visits to holy temples of the Church of Jesus Christ of Latter-day Saints.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user: User | null = session?.user ?? null;

  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
