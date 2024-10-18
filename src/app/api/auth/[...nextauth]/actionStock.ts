"use server"

import type { Stock } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authConfig } from "./config";

export async function getAllStocks() {
    const response = await fetch(`https://localhost:3000/api/stock`
    );
    const result: Stock[] = await response.json();
    return result;
}

export async function createStock(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };

    const response = await fetch(`https://localhost:3000/api/stock`, {
        method: "POST",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function updateStock(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };

    const response = await fetch(`https://194.113.34.25:433/api/stock`, {
        method: "PUT",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function removeStock(data: Stock) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };

    const response = await fetch(`https://localhost:3000/api/stock`, {
        method: "DELETE",
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}