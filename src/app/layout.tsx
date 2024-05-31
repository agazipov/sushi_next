import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import localFont from 'next/font/local';
import ImportBsJS from "./importBsJS";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const dokdo = localFont({
  src: '../../public/fonts/east-sea-dokdo.otf',
  display: 'swap',
  variable: "--font-dokdo",
})

const hanzi = localFont({
  src: '../../public/fonts/HanZi.ttf',
  // src: '../../public/fonts/Kreadon-Bold.ttf',
  // src: '../../public/fonts/presentscript-cyrillic.ttf',
  // src: '../../public/fonts/east-sea-dokdo.otf',
  // src: '../../public/fonts/EastSeaDokdo-Regular.ttf',
  display: 'swap',
  variable: "--font-hanzi",
})

export const metadata: Metadata = {
  title: "Fish&Rice",
  description: "Test next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      {/* <ImportBsJS /> */}
      <AuthProvider>
        <body className={`${dokdo.variable} ${hanzi.variable} ${inter.variable}`}>
        {/* <body className={myFont.className}> */}
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
