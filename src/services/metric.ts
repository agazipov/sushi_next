import { prisma } from "@/lib/prisma";

export async function getMetrickOrder() {
    return await prisma.metricOrder.findMany();
}
