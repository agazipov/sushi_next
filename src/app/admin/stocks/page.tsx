import { getAllStocks } from "@/src/app/api/auth/[...nextauth]/actionStock";
import StockList from "@/src/components/admin/StockList/StockList";

export const dynamic = 'error';
export const revalidate = 0;

export default async function AdminPage() {
    const stocks = await getAllStocks();

    return (
        <StockList stocks={stocks} />
    );
}