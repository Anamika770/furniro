import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import StoreProvider from "./StoreProvider";
import Header from "@/components/layout/SiteHeader";
import PageWrapper from "@/components/layout/PageTransition";
import { Toaster } from "sonner";
import Footer from "@/components/layout/SiteFooter";
import SessionProviderWrapper from "./SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Furniro",
  description: "Furniro - Your Furniture Store",
  keywords: "furniture, store, online store, e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <StoreProvider>
            <Header />
            <PageWrapper>
              {children}
              <Toaster />
            </PageWrapper>
            <Footer />
          </StoreProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
