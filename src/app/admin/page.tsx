import { getAllStocks } from "@/src/services/stock";
import StockList from "@/src/components/admin/StockList/StockList";

export default async function AdminPage() {   
    const stocks = await getAllStocks();

    return (
        <StockList stocks={stocks}/>
    );
}