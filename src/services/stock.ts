import { prisma } from "@/lib/prisma";

export async function getAllStocksFromPrisma() {
    return await prisma.stock.findMany();
}
