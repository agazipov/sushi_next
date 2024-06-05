import type { Metadata } from "next";
import AuthProvider from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Comfortaa, Dancing_Script, Inter, Kaushan_Script, Lobster, Montserrat, Pacifico } from "next/font/google";
import localFont from 'next/font/local';
import ImportBsJS from "./importBsJS";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-comfortaa" });
const lobster = Lobster({ weight: "400", subsets: ["latin"], variable: "--font-lobster" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });

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
        <body className={
          `
        ${dokdo.variable} 
          ${hanzi.variable} 
          ${inter.variable} 
          ${lobster.variable}
          ${pacifico.variable}
          ${comfortaa.variable}
          `
        }>
          {/* <body className={myFont.className}> */}
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
