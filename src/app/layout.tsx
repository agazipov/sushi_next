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
  title: "РыбаРис",
  description: "Доставка суши и пиццы в городе Бакал",
  keywords: ["РыбаРис", " Рыба&Рис", " рыба рис", " рыба рис бакал", " суши бакал", " Рыба-Рис", " Рыба&Рис", " суши", " роллы", " бакал", " в бакале", " пицца", " доставка", " заказать пиццу", " доставка пиццы", " Заказать суши", " пицца суши", " суши роллы", " суши роллы заказать"," суши роллы доставка", " меню суши роллы"," купить суши роллы"," суши роллы пицца"," заказ суши роллы"," суши рыба рис", " заказать рыба рис"],
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  metadataBase: new URL("https://fish-rice.ru"),
  openGraph: {
    url: "https://fish-rice.ru",
    type: "website",
    images: [
      {
        url: "https://fish-rice.ru/opengraf.png",
        width: 600,
        height: 300,
        type: "image/png",
        alt: "Рыба&Рис"
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
