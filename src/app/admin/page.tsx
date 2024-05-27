import { getAllStocks } from "@/src/app/api/auth/[...nextauth]/getStock";
import StockList from "@/src/components/admin/StockList/StockList";

export default async function AdminPage() {
    const stocks = await getAllStocks();

    return (
        <StockList stocks={stocks} />
    );
}