import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import PageWrapper from "./motionWrap";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <StoreProvider>
          
        <Header />
        <PageWrapper>
        {children}
        <Toaster />
        </PageWrapper>
        <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
