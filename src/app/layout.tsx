import type { Metadata } from "next";
import AuthProvider from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Comfortaa, Inter } from "next/font/google";
import localFont from 'next/font/local';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-comfortaa" });

const dokdo = localFont({
  src: '../../public/fonts/east-sea-dokdo.otf',
  display: 'swap',
  variable: "--font-dokdo",
})

const hanzi = localFont({
  src: '../../public/fonts/HanZi.ttf',
  display: 'swap',
  variable: "--font-hanzi",
})

export const metadata: Metadata = {
  title: "Рыба&Рис",
  description: "Доставка суши в городе Бакал",
  keywords: ["РыбаРис","Суши", "Роллы", "Бакал", "Пицца", "Доставка"],
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    url: "https://fish-rice.com",
    type: "website",
    images: [
      {
        url: "/opengraf.webp",
        width: 600,
        height: 300,
        type: "image/webp"
      }
    ],
    title: "Рыба&Рис",
    description: "Доставка суши в городе Бакал",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <AuthProvider>
        <body className={`${dokdo.variable} ${hanzi.variable} ${inter.variable} ${comfortaa.variable}`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
