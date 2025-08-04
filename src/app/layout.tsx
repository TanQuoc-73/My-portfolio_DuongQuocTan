
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { AuthProvider } from '@/context/AuthContext';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBox from '@/components/ChatBox';

const geist = Geist({ subsets: ['latin'], weight: 'variable' });

export const metadata: Metadata = {
  title: 'Dương Quốc Tần - Portfolio',
  description: 'A personal portfolio showcasing my work and skills.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={geist.className}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        <AuthProvider>
          <Header />
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Footer />
          <ChatBox />
        </AuthProvider>
      </body>
    </html>
  );
}

