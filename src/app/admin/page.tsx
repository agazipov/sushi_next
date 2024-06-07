import { getAllStocks } from "@/src/app/api/auth/[...nextauth]/actionStock";
import StockList from "@/src/components/admin/StockList/StockList";
import { useReportWebVitals } from 'next/web-vitals';
import { sendToAnalytics } from "../utils/analytic";

export const dynamic = 'error';
export const revalidate = 0;

export default async function AdminPage() {
    useReportWebVitals(sendToAnalytics);
    const stocks = await getAllStocks();

    return (
        <StockList stocks={stocks} />
    );
}