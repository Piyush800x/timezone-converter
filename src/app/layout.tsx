import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: {
    default: "TimeZonesNow - World Clock & Time Zone Converter",
    template: "%s | TimeZonesNow",
  },
  description:
    "Convert between time zones instantly with our free online tool. See current times worldwide and compare multiple locations.",
  keywords: [
    "time zone converter",
    "world clock",
    "time difference calculator",
    "international time zones",
    "timezone map",
  ],
  authors: [{ name: "Piyush Paul" }],
  openGraph: {
    title: "TimeZonesNow - World Clock & Time Zone Converter",
    description:
      "Convert between time zones instantly with our free online tool",
    url: "https://timezone.piyushpaul.com",
    siteName: "TimeZonesNow",
    images: [
      {
        url: "https://timezone.piyushpaul.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeZonesNow - World Clock & Time Zone Converter",
    description:
      "Convert between time zones instantly with our free online tool",
    images: ["https://timezone.piyushpaul.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/BricolageGrotesque.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="canonical" href="https://yourdomain.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${bricolageGrotesque.variable} ${space_mono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
