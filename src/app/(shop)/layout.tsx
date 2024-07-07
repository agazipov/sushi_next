import LastOrderProvider from "@/src/context/lastOrder/LastOrderProvider";
import TimeOutProvider from "@/src/context/timeOut/TimeOutProvider";
import StoreProvider from "../lib/StoreProvider";
import Background from "@/src/components/shop/Background/Background";
import Header from "@/src/components/shop/Header/Header";
import Navigation from "@/src/components/shop/Navigation/Navigation";
import Footer from "@/src/components/shop/Footer/Footer";
import styles from "@/styles/shop.module.scss";
import { Suspense } from "react";
import { Metric } from "@/src/components/shop/Metric/Metric";
import Head from "next/head";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <TimeOutProvider>
                <LastOrderProvider>
                    <Head>
                        <meta data-meta="ssr" data-vmid="title" name="title" content="РыбаРис доставка суши и пиццы в городе Бакал" />
                    </Head>
                    <Background />
                    {/* <Suspense>
                        <Metric />
                    </Suspense> */}
                    <div className={styles.root}>
                        <Header />
                        <Navigation />
                        <main className={styles.main}>{children}</main>
                        <Footer />
                    </div>
                </LastOrderProvider>
            </TimeOutProvider>
        </StoreProvider>
    )
}