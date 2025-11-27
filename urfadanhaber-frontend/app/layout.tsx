import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InstallPrompt from "@/components/pwa/InstallPrompt";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "UrfadanHaber - Şanlıurfa'nın Haber Sitesi",
  description: "Şanlıurfa ve bölgesinden son dakika haberleri, yerel haberler, ulusal haberler, spor, magazin ve daha fazlası.",
  keywords: "Şanlıurfa, Urfa, haber, yerel haber, Şanlıurfa haberleri, son dakika",
  openGraph: {
    title: "UrfadanHaber - Şanlıurfa'nın Haber Sitesi",
    description: "Şanlıurfa ve bölgesinden son dakika haberleri",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrfadanHaber - Şanlıurfa'nın Haber Sitesi",
    description: "Şanlıurfa ve bölgesinden son dakika haberleri",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#009036" />
      </head>
      <body className={`${inter.variable} font-sans bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <InstallPrompt />
        <Footer />
      </body>
    </html>
  );
}
