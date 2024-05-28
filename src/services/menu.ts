import { prisma } from "@/lib/prisma";

export function getAllSets() {
    return prisma.set.findMany({
        include: {
            dishes: true,
        }
    });
}

export function getAllCategories() {
    return prisma.categorie.findMany();
}

export function getCategorieById(id: string) {
    return prisma.categorie.findUnique({
        where: { id },
        include: {
            dishes: true,
        }
    })
}

export function getDishById(id: string) {
    return prisma.dish.findUnique({
        where: { id },
    })
}