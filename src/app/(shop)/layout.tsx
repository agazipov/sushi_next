import Footer from "@/src/components/shop/Footer/Footer";
import Header from "@/src/components/shop/Header/Header";
import Navigation from "@/src/components/shop/Navigation/Navigation";
import StoreProvider from "../lib/StoreProvider";
import Background from "@/src/components/shop/Background/Background";
import React from "react";
import styles from "./styles.module.scss";
import LastOrderProvider from "@/src/context/LastOrderProvider";
import TimeOutProvider from "@/src/context/TimeOutProvider";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <TimeOutProvider>
                <LastOrderProvider>
                    <Background />
                    <div className={styles.font__styles}>
                        <Header />
                        <Navigation />
                        <main>{children}</main>
                        <Footer />
                    </div>
                </LastOrderProvider>
            </TimeOutProvider>
        </StoreProvider>
    )
}