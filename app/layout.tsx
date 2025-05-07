import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free Questions',
  description: 'Ask and view anonymous questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-background to-background/90`}>
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}