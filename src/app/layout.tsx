import type { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';

import { auth } from '@/auth';
import { APP_NAME } from '@/constants/config';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Making the world a better place through constructing elegant hierarchies.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDarkMode = true; // @TODO: read from config
  const session = await auth();

  return (
    <html lang='en' className={isDarkMode ? 'dark' : ''}>
      <SessionProvider session={session}>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
