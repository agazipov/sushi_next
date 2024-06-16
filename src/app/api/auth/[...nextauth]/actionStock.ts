"use server"

import type { Stock } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authConfig } from "./config";

export async function getAllStocks() {
    const response = await fetch(`${process.env.FETCH_URL}/api/stock`
    );
    const result: Stock[] = await response.json();
    return result;
}

export async function createStock(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };

    const response = await fetch(`${process.env.FETCH_URL}/api/stock`, {
        method: "POST",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function updateStock(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };

    const response = await fetch(`${process.env.FETCH_URL}/api/stock`, {
        method: "PUT",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function removeStock(data: Stock) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };

    const response = await fetch(`${process.env.FETCH_URL}/api/stock`, {
        method: "DELETE",
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}