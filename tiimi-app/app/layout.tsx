import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiimi app",
  description: "Recruitment dashboard", 
};

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className={styles.page}>
          <Sidebar />
          <Header />
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
