import type { Metadata } from 'next';
import {
  Cookie,
  Gloock,
  Inknut_Antiqua,
  Jacques_Francois,
  Just_Another_Hand,
  Roboto,
} from 'next/font/google';
import React from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto',
});

const cookie = Cookie({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cookie',
});
const inknut = Inknut_Antiqua({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inukit',
});

const jacques = Jacques_Francois({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jacques',
});
const hand = Just_Another_Hand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hand',
});
const gloock = Gloock({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-gloock',
});

export const metadata: Metadata = {
  title: 'Vanish - Safe File Deletion Tool | Modern CLI by Nurysso',
  description:
    'Vanish (vx) is a modern, safe file deletion tool with recovery capabilities and beautiful TUI interface. Built with GoLang and Bubble Tea framework. 8 themes, pattern-based restoration, and comprehensive file management.',
  keywords: [
    'Vanish CLI',
    'safe file deletion',
    'file recovery tool',
    'rm alternative',
    'trash CLI',
    'Go CLI tool',
    'Bubble Tea TUI',
    'file cache system',
  ],
  openGraph: {
    title: 'Vanish - Modern Safe File Deletion Tool',
    description:
      'Safe file deletion with recovery, beautiful TUI, and 8 themes. A modern alternative to rm.',
    url: 'https://dawood.page/projects/vanish',
    images: [
      {
        url: '/api/og?title=Vanish&subtitle=Safe%20File%20Deletion%20Tool&project=CLI%20Tool',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://dawood.page/projects/vanish',
  },
};

const vanishStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vanish',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: ['Linux', 'macOS', 'Windows'],
  description:
    'A modern, safe file deletion tool with recovery capabilities and beautiful TUI interface',
  author: {
    '@type': 'Person',
    name: 'Dawood Khan',
    alternateName: 'Nurysso',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://github.com/Nurysso/vanish',
  downloadUrl: 'https://github.com/Nurysso/vanish/releases',
  softwareVersion: '0.9.0',
  programmingLanguage: 'Go',
  screenshot: 'https://dawood.page/projects/vanish-screenshot.jpg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vanishStructuredData) }}
        />
      </head>
      <body
        className={`${cookie.variable} ${roboto.variable} ${inknut.variable} ${jacques.variable} ${hand.variable} ${gloock.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
