"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMetrickOrder() {
    try {
        return await prisma.metricOrder.findMany();
    } catch (error) {
        console.error(error);
    }
}

export async function resetMetrickOrder() {
    try {
        await prisma.metricOrder.update({
            where: {
                id: process.env.METRIC_ID
            },
            data: {
                price: 0,
                countDishes: 0,
                allOrders: 0,
            }
        });
    
        revalidatePath(`/admin`);
    } catch (error) {
        console.error(error);
    }
}
