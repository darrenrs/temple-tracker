import Navbar from '@/app/components/Navbar';
import { auth } from '@/auth';
import type { Session } from "next-auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from 'next-themes'

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ['400'],
  variable: '--font-inter'
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
  const user: Session["user"] | null = session?.user ?? null;

  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="border-b border-black/10 dark:border-white/10">
            <Navbar user={ user } />
          </header>

          <main className="container mx-auto max-w-7xl p-2 pt-6 sm:p-6">
            {children}
          </main>

          <footer className="border-t border-black/10 dark:border-white/10">
            <div className="flex justify-between container mx-auto max-w-7xl px-2 py-6 sm:p-6 text-sm">
              <div className="text-gray-500">&copy; {new Date().getFullYear()} Enigmaxim. All rights reserved.</div>
              <div>
                <a href="https://github.com/darrenrs/temple-tracker" className="text-blue-500 underline underline-offset-2">GitHub</a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
    );
}
