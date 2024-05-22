"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import type { Stock } from "@prisma/client";

export async function createStock(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return;

    const response = await fetch('http://localhost:3000/api/stock/createStock', {
        method: "POST",
        body: data
    })
    const result = await response.json();
    console.log("result", result);

    revalidatePath(`/admin`);
}

export async function updateStock(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return;

    const response = await fetch('http://localhost:3000/api/stock/updateStock', {
        method: "POST",
        body: data
    })
    const result = await response.json();
    console.log("result", result);

    revalidatePath(`/admin`);
}

export async function removeStock(data: Stock) {
    const session = await getServerSession(authConfig);
    if (!session) return;
    console.log("stock", data);
    

    const response = await fetch('http://localhost:3000/api/stock/removeStock', {
        method: "POST",
        body: JSON.stringify(data)
    })
    const result = await response.json();
    console.log("result", result);

    revalidatePath(`/admin`);
}