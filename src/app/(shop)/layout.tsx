import Footer from "@/src/components/shop/Footer/Footer";
import Header from "@/src/components/shop/Header/Header";
import Navigation from "@/src/components/shop/Navigation/Navigation";

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Header />
            <Navigation />
            <main>{children}</main>
            <Footer />
        </>
    )
}