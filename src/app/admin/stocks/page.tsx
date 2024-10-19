import StockList from "@/src/components/admin/StockList/StockList";
import { getAllStocksFromPrisma } from "@/src/services/stock";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const stocks = await getAllStocksFromPrisma();

    return (
        <StockList stocks={stocks} />
    );
}