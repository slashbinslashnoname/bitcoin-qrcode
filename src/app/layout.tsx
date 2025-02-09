import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TopLeftNav } from "@/components/top-left-nav";
import { Toolbar } from '@/components/toolbar';
const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin QR Code Scanner by Slashbin",
  description: "Bitcoin QR code scanner by Slashbin.",
  keywords: ['Bitcoin QR Code Scanner', 'Bitcoin QR Code', 'Bitcoin QR Code Scanner by Slashbin'],
  authors: [{ name: 'Slashbin' }],
  openGraph: {
    title: 'QR Code Scanner - Slashbin',
    description: 'Scanner de QR Code simple et efficace.',
    url: 'https://bitcoinqrcodescanner.com',
    siteName: 'Bitcoin QR Code Scanner',
    images: [
      {
        url: '/twitter.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Scanner',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': 'standard',
      'max-snippet': 100,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={geist.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex items-center justify-center bg-background">
            <header>
              <TopLeftNav />
              <Toolbar />
            </header>
            <article className="w-full">
              {children}
            </article>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
