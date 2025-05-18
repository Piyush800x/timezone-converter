import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Toaster } from "sonner";

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TimeZonesNow",
  description: "Time zone converter created by Piyush Paul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.className} ${space_mono.className}  antialiased `}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
