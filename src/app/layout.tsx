import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../context/AuthProvider";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImportBsJS from "./importBsJS";

const inter = Inter({ subsets: ["latin"] });

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
      <ImportBsJS />
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
      <div id="portal" />
    </html>
  );
}
