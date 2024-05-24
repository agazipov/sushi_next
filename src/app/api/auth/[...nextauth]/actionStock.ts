import { revalidatePath } from "next/cache";
import type { Stock } from "@prisma/client";

export async function createStock(data: FormData) {
    const response = await fetch('http://localhost:3000/api/stock/createStock', {
        method: "POST",
        body: data
    })
    const result = await response.json();
    console.log("result", result);

    revalidatePath(`/admin`);
}

export async function updateStock(data: FormData) {
    const response = await fetch('http://localhost:3000/api/stock/updateStock', {
        method: "POST",
        body: data
    })
    const result = await response.json();
    console.log("result", result);

    revalidatePath(`/admin`);
}

export async function removeStock(data: Stock) {
    const response = await fetch('http://localhost:3000/api/stock/removeStock', {
        method: "POST",
        body: JSON.stringify(data)
    })
    const result = await response.json();
}