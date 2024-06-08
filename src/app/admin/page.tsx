import { getAllStocks } from "@/src/app/api/auth/[...nextauth]/actionStock";
import StockList from "@/src/components/admin/StockList/StockList";
import { getMetrickOrder } from "@/src/services/metric";
import { getAllStocksFromPrisma } from "@/src/services/stock";

export const dynamic = 'error';
export const revalidate = 0;

export default async function AdminPage() {
    const stocks = await getAllStocks();
    // const stocks = await getAllStocksFromPrisma();
    const metric = await getMetrickOrder();

    return (
        <>
            <StockList stocks={stocks} metric={metric[0]}/>
        </>
    );
}