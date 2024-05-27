import { prisma } from "@/lib/prisma";

export async function getAllStocksFromPrisma() {
    return prisma.stock.findMany();
}
