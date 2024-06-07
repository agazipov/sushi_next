import { prisma } from "@/lib/prisma";

export function getAllStocksFromPrisma() {
    return prisma.stock.findMany();
}
