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
          <div className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-[#020408]">
            <div className="app-mesh" />

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
