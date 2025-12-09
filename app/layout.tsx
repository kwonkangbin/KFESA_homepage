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
  title: "KFESA - 한국외국인일자리협회",
  description: "Korea Foreign Employment Support Association - 한국에서 일하고자 하는 외국인의 든든한 파트너",
  verification: {
    other: {
      "naver-site-verification": ["5cd6aab3517ae14bb159ed6a9fdc64fd5a5afff0"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
