"use server";

import { prisma } from "@/lib/prisma";
import { Stock } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authConfig } from "../app/api/auth/[...nextauth]/config";
import { IResult } from "../types/commonTypes";

export async function getAllStocksFromPrisma() {
    try {
        return await prisma.stock.findMany();
    } catch (error) {
        console.error(error);
    }
}

export async function createStockFromPrisma(data: FormData) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return { message: "access denied" };

        const file = Object.fromEntries(data) as unknown as Stock;

        await prisma.stock.create({
            data: {
                title: file.title,
                body: file.body,
                show: (file.show as unknown as string) === "true" ? true : false,
                img: file.img,
            },
        });

        revalidatePath(`/admin/stocks`);
        return { message: "file create" };
    } catch (error) {
        console.error(error);
        return { message: "request processing error" };
    }
}

export async function updateStockFromPrisma(data: FormData) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return { message: "access denied" };

        const file = Object.fromEntries(data) as unknown as Stock;

        await prisma.stock.update({
            where: {
                id: file.id,
            },
            data: {
                title: file.title,
                body: file.body,
                show: (file.show as unknown as string) === "true" ? true : false,
                img: file.img
            }
        });
        
        revalidatePath(`/admin/stocks`);
        return { message: "file update" };
    } catch (error) {
        console.error(error);
        return { message: "request processing error" };
    }
}

export async function removeStockFromPrisma(stock: Stock): Promise<IResult> {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return { message: "access denied" };

        await prisma.stock.delete({
            where: {
                id: stock.id,
            },
        });

        revalidatePath(`/admin/stocks`);
        return { message: "file delete" };
    } catch (error) {
        console.error(error);
        return { message: "request processing error" };
    }
}