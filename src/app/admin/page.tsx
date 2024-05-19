import { getServerSession } from "next-auth/next";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { getAllStocks } from "@/src/services/stock";
import Stock from "@/src/components/Stock/Stock";

export default async function AdminPage() {   
    const session = await getServerSession(authConfig);
    const stocks = await getAllStocks();

    if (!session) {
        return <div>Нет сессии</div>        
    }

    return (
      <div>
        <h1>AdminPanel</h1>

        <Stock stocks={stocks}/>
      </div>
    );
}