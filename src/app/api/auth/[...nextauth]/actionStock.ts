"use server"

import type { Stock } from "@prisma/client";

export async function getAllStocks() {   
    const response = await fetch(`${process.env.FETCH_URL}/api/stock`
    );
    const result: Stock[] = await response.json();
    return result;
}

export async function createStock(data: FormData) {
    const response = await fetch(`${process.env.FETCH_URL}/api/stock`, {
        method: "POST",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function updateStock(data: FormData) {   
    const response = await fetch(`${process.env.FETCH_URL}/api/stock`, {
        method: "PUT",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function removeStock(data: Stock) {
    const response = await fetch(`${process.env.FETCH_URL}/api/stock`, {
        method: "DELETE",
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}