import Navbar from '@/app/components/Navbar';
import { auth } from '@/auth';
import { User } from '@auth/core/types';
import type { Metadata } from "next";
import { Sedan } from "next/font/google";
import "@/app/globals.css";

const font = Sedan({ subsets: ["latin"], weight: ['400'] });

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
  const user : User | null = session?.user ?? null;

  return (
    <html lang="en">
      <body className={`${font.className} dark:bg-slate-800 dark:text-white`}>
        {user ? (
          <Navbar user={user} />
        ) : (
          <Navbar user={null} />
        )}
        {children}
      </body>
    </html>
  );
}
