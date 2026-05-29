import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import {
  Gloock,
  Inknut_Antiqua,
  Jacques_Francois,
  Just_Another_Hand,
  Roboto,
} from 'next/font/google';
import React from 'react';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto',
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
  title:
    'Dawood Khan (Nurysso) - Full Stack Developer | GoLang, Python, Web Technologies & Linux Systems | Open Source Creator',
  description:
    'Full Stack Developer & Open Source Creator specializing in GoLang, Python, and modern web technologies. Creator of Vanish (safe file deletion CLI), Hecate (Hyprland dotfiles), and Venus. Building system tools and beautiful TUI applications. Available for freelance work.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  keywords: [
    // Personal Branding
    'Dawood Khan',
    'Nurysso',
    'Nurysso developer',
    'Dwukn',
    'Dawood Khan portfolio',

    // Developer Skills
    'Full Stack Developer',
    'GoLang Developer',
    // "Rust Developer",
    'JavaScript Developer',
    'TypeScript Developer',
    'React Developer',
    'Next.js Developer',
    'Systems Programmer',
    'CLI Developer',
    'TUI Applications',

    // Projects - Vanish
    'Vanish CLI',
    'Vanish file deletion tool',
    'safe file deletion',
    'file recovery tool',
    'rm alternative',
    'trash CLI',
    'file cache system',
    'terminal file manager',
    'Go CLI tool',

    // Projects - Hecate
    'Hecate Hyprland',
    'Hyprland dotfiles',
    'Hyprland configuration',
    'Hyprland themes',
    'dynamic theming Linux',
    'Wayland rice',
    'Linux desktop customization',
    'Waybar themes',
    'Hyprland setup',
    'Linux dotfiles',

    'bubbleTea',
    'Tyr',

    // Technologies
    'Bubble Tea framework',
    'Lip Gloss styling',
    'Wallust integration',
    'TOML configuration',
    'Linux system tools',
    'Wayland compositor',

    // Skills & Services
    'Open Source Developer',
    'Linux Developer',
    'System Programming',
    'CLI Tools Developer',
    'Terminal UI Developer',
    'Freelance Developer',
    'Software Engineer',
    'Tech Content Creator',

    // Location (if relevant)
    'Hyderabad Developer',
    'India Developer',
  ],
  authors: [{ name: 'Dawood Khan', url: 'https://dawood.page' }, { name: 'Nurysso' }],
  creator: 'Dawood Khan (Nurysso)',
  publisher: 'Dawood Khan',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dawood.page',
    title: 'Dawood Khan (Nurysso) - Full Stack Developer & Open Source Creator',
    description:
      'Creator of Vanish (safe file deletion CLI with recovery), Hecate (dynamic Hyprland theming), and other open-source tools. Specializing in GoLang, Python, and beautiful applications.',
    siteName: 'Dawood Khan - Nurysso Portfolio',
    images: [
      {
        url: 'https://https://dawood.page/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dawood Khan Portfolio - Creator of Vanish CLI and Hecate Hyprland',
      },
      // images: [
      //   {
      //     url: '/api/og?title=Dawood%20Khan&subtitle=Full%20Stack%20Developer',
      //     width: 1200,
      //     height: 630,
      //   },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Dawood Khan (Nurysso) - Full Stack Developer',
    description:
      'Open Source Creator | Vanish CLI • Hecate Hyprland • Venus | GoLang & Web Developer | Building beautiful terminal applications',
    images: ['https://dawood.page/og-image.jpg'],
    creator: '@dwukn',
  },

  metadataBase: new URL('https://dawood.page'),

  alternates: {
    canonical: 'https://dawood.page',
  },

  category: 'technology',
  classification: 'Developer Portfolio',

  // Additional JSON-LD structured data for better SEO
  other: {
    'application-name': 'Dawood Khan Portfolio',
    'msapplication-TileColor': '#1a1b26',
    'theme-color': '#1a1b26',
  },

  // verification: {
  //   google: 'your-google-search-console-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

// const structuredData = {
//   "@context": "https://schema.org",
//   "@type": "Person",
//   name: "Dawood Khan",
//   alternateName: "Nurysso",
//   url: "https://dawood.page",
//   image: "https://dawood.page/og-image.jpg",
//   jobTitle: "Full Stack Developer",
//   description: "Full Stack Developer and Open Source Creator specializing in GoLang, Rust, and system programming",
//   sameAs: [
//     "https://github.com/Nurysso",
//     "https://linkedin.com/in/dawood-khan",
//     "https://youtube.com/@Nurysso",
//     "https://twitter.com/dwukn"
//   ],
//   knowsAbout: [
//     "GoLang", "Rust", "JavaScript", "TypeScript", "React", "Next.js",
//     "Linux", "Hyprland", "CLI Development", "System Programming"
//   ],
//   workExample: [
//     {
//       "@type": "SoftwareApplication",
//       name: "Vanish",
//       description: "A modern, safe file deletion tool with recovery capabilities",
//       url: "https://github.com/Nurysso/vanish",
//       applicationCategory: "DeveloperApplication",
//       operatingSystem: "Linux, macOS, Windows",
//     },
//     {
//       "@type": "SoftwareSourceCode",
//       name: "Hecate",
//       description: "Dynamic Hyprland dotfiles with intelligent theming",
//       codeRepository: "https://github.com/Nurysso/Hecate",
//       programmingLanguage: "Shell",
//     }
//   ]
// }

// Vanish Project Page Metadata
export const vanishMetadata: Metadata = {
  title: 'Vanish - Safe File Deletion Tool with Recovery | Modern CLI by Nurysso',
  description:
    'Vanish (vx) is a modern, safe file deletion tool with recovery capabilities and beautiful TUI interface. Never lose important files again with pattern-based restoration, 8 themes, and comprehensive file management. Built with GoLang and Bubble Tea.',
  keywords: [
    'Vanish CLI',
    'safe file deletion',
    'file recovery tool',
    'rm alternative',
    'trash CLI',
    'terminal file manager',
    'Go CLI tool',
    'Bubble Tea TUI',
    'file cache system',
    'Linux file deletion',
    'pattern matching restore',
    'vx command',
    'recycle bin CLI',
  ],
  openGraph: {
    title: 'Vanish - Modern Safe File Deletion Tool',
    description:
      'Safe file deletion with recovery, beautiful TUI, 8 themes, and pattern-based restoration. A modern alternative to rm.',
    images: ['/vanish-og.jpg'],
  },
};

// Hecate Project Page Metadata
export const hecateMetadata: Metadata = {
  title: 'Hecate - Dynamic Hyprland Dotfiles with Automatic Theming | Linux Rice',
  description:
    'Hecate provides beautiful Hyprland dotfiles with dynamic theming that automatically extracts colors from your wallpaper. Supports multiple terminals (Alacritty, Kitty, Foot, Ghostty) and shells (Bash, Zsh, Fish). Complete Waybar, Rofi, and SwayNC configuration included.',
  keywords: [
    'Hecate Hyprland',
    'Hyprland dotfiles',
    'Hyprland themes',
    'dynamic theming Linux',
    'Wayland rice',
    'Linux desktop customization',
    'Waybar configuration',
    'Hyprland setup',
    'Wallust integration',
    'Linux ricing',
    'Wayland compositor themes',
    'Hyprland waybar',
    'automatic color theming',
    'Linux aesthetic',
  ],
  openGraph: {
    title: 'Hecate - Dynamic Hyprland Dotfiles',
    description:
      'Transform your Hyprland desktop with automatic wallpaper-based theming. Beautiful, intelligent, and easy to install.',
    images: ['/hecate-og.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dawood Khan',
  alternateName: 'Dwukn',
  url: 'https://dawood.page',
  image: 'https://dawood.page/og-image.jpg',
  jobTitle: 'Full Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance / Open Source Projects',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Lords Institute of Engineering and Technology',
  },
  knowsAbout: [
    'Go',
    'JavaScript',
    'React',
    'Next.js',
    'Linux',
    'Web Development',
    'System Programming',
  ],
  sameAs: [
    'https://github.com/Dwukn',
    'https://www.linkedin.com/in/dwukn',
    'https://x.com/dwukn',
    'https://leetcode.com/dwukn',
    // add other profiles
  ],
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://dawood.page',
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link rel="canonical" href="https://dawood.page" /> */}
      </head>
      <body
        className={`${roboto.variable} ${inknut.variable} ${jacques.variable} ${hand.variable} ${gloock.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
