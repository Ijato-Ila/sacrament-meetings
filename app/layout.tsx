import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan and review sacrament meeting programs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <Header />

        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <NavLinks />
          </div>
        </div>

        <main className="min-h-screen bg-gray-50 px-6 py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}