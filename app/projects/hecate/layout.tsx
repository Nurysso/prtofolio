import { Metadata } from 'next'
import React from 'react'
import {
  Roboto,
  Inknut_Antiqua,
  Jacques_Francois,
  Just_Another_Hand,
  Gloock,
  Cookie
} from 'next/font/google';


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto'
});

const cookie = Cookie({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cookie'
});
const inknut = Inknut_Antiqua({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inukit'
});

const jacques = Jacques_Francois({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jacques'
});
const hand = Just_Another_Hand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hand'
});
const gloock = Gloock({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-gloock'
});

export const metadata: Metadata = {
  title: "Hecate - Dynamic Hyprland Dotfiles | Automatic Theming for Linux",
  description: "Hecate provides beautiful Hyprland dotfiles with dynamic theming that automatically extracts colors from your wallpaper. Supports Alacritty, Kitty, Foot, Ghostty, and multiple shells. Complete Waybar, Rofi, and SwayNC configuration.",
  keywords: [
    "Hecate Hyprland", "Hyprland dotfiles", "dynamic theming Linux",
    "Wayland rice", "Waybar themes", "Hyprland configuration", "Linux ricing"
  ],
  openGraph: {
    title: "Hecate - Dynamic Hyprland Dotfiles",
    description: "Transform your Hyprland desktop with automatic wallpaper-based theming.",
    url: "https://dawood.page/projects/hecate",
    images: [
      {
        url: "https://dawood.page/projects/hecate-og.jpg",
        width: 1200,
        height: 630,
      }
    ],
  },
  alternates: {
    canonical: "https://dawood.page/projects/hecate",
  },
}

const hecateStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Hecate",
  description: "Dynamic Hyprland dotfiles with intelligent theming that adapts to your wallpaper",
  author: {
    "@type": "Person",
    name: "Dawood Khan",
    alternateName: "Nurysso"
  },
  codeRepository: "https://github.com/Nurysso/Hecate",
  programmingLanguage: "Shell",
  operatingSystem: "Linux",
  targetProduct: {
    "@type": "SoftwareApplication",
    name: "Hyprland",
    applicationCategory: "Window Manager"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hecateStructuredData) }}
      />
      <main>
        <body
        className={`${cookie.variable} ${roboto.variable} ${inknut.variable} ${jacques.variable} ${hand.variable} ${gloock.variable} antialiased`}
      >
        {children}
      </body>
      </main>
    </>
  )
}
