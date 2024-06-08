import Home from "@/src/components/shop/Glagne/Glagne";
import { getAllStocksFromPrisma } from "@/src/services/stock";

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export default async function Main() {
    const stocks = await getAllStocksFromPrisma();

    return (
        <Home stocks={stocks} />
    );
}
