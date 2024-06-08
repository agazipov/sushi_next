import { prisma } from "@/lib/prisma";

export async function getAllCategories() {
    return await prisma.categorie.findMany();
}

export async function getCategorieById(id: string) {
    return await prisma.categorie.findUnique({
        where: { id },
        include: {
            dishes: true,
        }
    })
}

export async function getDishById(id: string) {
    return await prisma.dish.findUnique({
        where: { id },
    })
}