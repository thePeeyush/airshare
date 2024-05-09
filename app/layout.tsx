import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { WavyBackground } from "@/components/ui/wavy-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirShare",
  description: "Peer to Peer file sharing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <WavyBackground className="max-w-4xl mx-auto">
          <main className={inter.className}>
            {children}
          </main>
        </WavyBackground>
        <Toaster />
      </body>
    </html>
  );
}
