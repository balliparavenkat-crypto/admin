import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

import FloatingWhatsAppBadge from "./components/FloatingWhatsAppBadge";

export const metadata: Metadata = {
  title: "D&V Global Summit | Enterprise Conference Management Platform",
  description: "D&V Global Summit is a state-of-the-art conference management system built for international summits, academic tracks, and scientific reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} dark`}>
      <body className="antialiased bg-background text-gray-200 flex flex-col min-h-screen justify-between">
        <div className="flex-grow">
          {children}
        </div>
        <div className="w-full py-3 px-6 md:px-12 bg-[#090d14] border-t border-white/5 flex justify-end items-center text-xs text-gray-400">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/80 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-[11px] text-gray-300 font-medium">
              Developed by{" "}
              <a
                href="https://arohi.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent hover:underline"
              >
                arohi.dev
              </a>
            </span>
          </div>
        </div>
        <FloatingWhatsAppBadge />
      </body>
    </html>
  );
}
