"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMetrickOrder() {
    return await prisma.metricOrder.findMany();
}

export async function resetMetrickOrder() {
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
}
