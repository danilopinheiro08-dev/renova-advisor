import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Renova Advisor | Premium",
  description: "A ferramenta definitiva para o assessor de elite.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Renova Advisor",
  },
};

export const viewport: Viewport = {
  themeColor: "#020408",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased selection:bg-blue-500/30">
        <Providers>
          <div className="app-shell flex min-h-[100dvh] flex-col overflow-hidden">
            <div className="app-mesh" />
            <div className="app-grid absolute inset-0 opacity-30" />

            <main className="flex-1 w-full relative z-10">
              {children}
            </main>

            <Navigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
