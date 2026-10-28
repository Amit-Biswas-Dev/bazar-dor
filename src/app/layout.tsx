
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToastProvider from "./components/ToastProvider";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের বাজারমূল্য",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ToastProvider />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
