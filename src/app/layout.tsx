import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { PinLock } from "@/components/PinLock";
import { Navigation } from "@/components/Navigation";
import { TopBar } from "@/components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renova Advisor",
  description: "Swiss Army Knife for Financial Advisors",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-50">
        <Providers>
          <PinLock>
            <TopBar />
            <main className="flex-1 max-w-md w-full mx-auto pt-14 pb-16 min-h-screen border-x border-slate-800 shadow-2xl bg-slate-900 relative">
              {children}
            </main>
            <Navigation />
          </PinLock>
        </Providers>
      </body>
    </html>
  );
}
