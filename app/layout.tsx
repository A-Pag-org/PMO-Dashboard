// FILE: app/layout.tsx
// PURPOSE: Root layout — Inter font setup, metadata, global CSS import
// DESIGN REF: Wireframe all pages (font is Inter per spec)

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Delhi Air Pollution Mitigation — Impact Dashboard',
  description:
    'Track KPI progress across 8 pollution-mitigation initiatives across 9 cities in Delhi-NCR',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
