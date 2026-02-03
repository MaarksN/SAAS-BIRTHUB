import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@salesos/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SalesOS Ultimate',
  description: 'Unified Sales Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
