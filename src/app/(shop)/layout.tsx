import StoreProvider from "../lib/StoreProvider";
import LastOrderProvider from "@/src/context/LastOrderProvider";
import TimeOutProvider from "@/src/context/TimeOutProvider";
import Background from "@/src/components/shop/Background/Background";
import Header from "@/src/components/shop/Header/Header";
import Navigation from "@/src/components/shop/Navigation/Navigation";
import Footer from "@/src/components/shop/Footer/Footer";
import styles from "@/styles/shop.module.scss";
import { Suspense } from "react";
import { Metric } from "@/src/components/shop/Metric/Metric";

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
                    <Suspense>
                        <Metric />
                    </Suspense>
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