import { prisma } from "@/lib/prisma";

export function getAllStocks() {
    return prisma.stock.findMany();
}

export function getStockById(id: string) {
    return prisma.stock.findUnique({
        where: { id }
    })
}