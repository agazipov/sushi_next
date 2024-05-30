"use client"

import { getAllStocks } from "@/src/app/api/auth/[...nextauth]/getStock";
import StockList from "@/src/components/admin/StockList/StockList";
import { Stock } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [stocks, setStocks] = useState<Stock[]>([])
    useEffect(() => {
        getAllStocks().then((result) => {
            setStocks(result)
        });

    }, [])

    return (
        <StockList stocks={stocks} />
    );
}