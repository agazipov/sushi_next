import { Stock } from "@prisma/client";

export async function getAllStocks() {   
    const response = await fetch(`${process.env.FETCH_URL}/api/stock/getStock`
    );
    const result: Stock[] = await response.json();
    return result;
}
