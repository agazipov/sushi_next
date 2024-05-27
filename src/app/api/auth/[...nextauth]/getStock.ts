import { Stock } from "@prisma/client";

export async function getAllStocks() {
    const response = await fetch('http://localhost:3000/api/stock/getStock', {
        next: {revalidate:0}
    });
    const result: Stock[] = await response.json();
    return result;
}
