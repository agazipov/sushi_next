import { Stock } from "@prisma/client";

export async function getAllStocks() {
    const response = await fetch('http://localhost:3000/api/stock/getStock');
    const result: Stock[] = await response.json();
    return result;
}
