import Footer from "@/src/components/shop/Footer/Footer";
import Header from "@/src/components/shop/Header/Header";
import Navigation from "@/src/components/shop/Navigation/Navigation";
import StoreProvider from "../lib/StoreProvider";
import Background from "@/src/components/shop/Background/Background";
import React from "react";
import styles from "./styles.module.scss";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <Background />
            <div className={styles.font__styles}>
                <Header />
                <Navigation />
                <main>{children}</main>
                <Footer />
            </div>
        </StoreProvider>
    )
}