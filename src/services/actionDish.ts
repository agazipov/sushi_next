"use server";

import { prisma } from "@/lib/prisma";
import type { Dish } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authConfig } from "../app/api/auth/[...nextauth]/config";

export async function createDish(data: FormData) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return;

        const { name,
            compound,
            price_for_large: PfLToNumber,
            price_for_mid: PfMToNumber,
            img,
            categorieId,
            stock,
            select,
            show
        } = Object.fromEntries(data) as unknown as Omit<Dish, "id">;
        const price_for_large = Number(PfLToNumber);
        const price_for_mid = Number(PfMToNumber);

        const dish = await prisma.dish.create({
            data: {
                name,
                compound,
                price_for_large,
                price_for_mid,
                img,
                categorieId,
                stock,
                select: select ? "large" : "mid",
                show: show ? true : false
            },
        });

        revalidatePath(`/admin/${dish.categorieId}`);
    } catch (error) {
        console.error(error);
    }
}

export async function updateDish(data: FormData) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return;

        const {
            id,
            name,
            compound,
            price_for_large: PfLToNumber,
            price_for_mid: PfMToNumber,
            img,
            stock,
            select,
            show
        } = Object.fromEntries(data) as unknown as Dish;
        const price_for_large = Number(PfLToNumber);
        const price_for_mid = Number(PfMToNumber);

        const dish = await prisma.dish.update({
            where: {
                id,
            },
            data: {
                name,
                compound,
                price_for_large,
                price_for_mid,
                img,
                stock,
                select: select ? "large" : "mid",
                show: show ? true : false
            },
        });

        revalidatePath(`/admin/${dish.categorieId}`);
    } catch (error) {
        console.error(error);
    }
}

export async function removeDish(dish: Dish) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return;

        const deleteDish = await prisma.dish.delete({
            where: {
                id: dish.id,
            },
        });

        revalidatePath(`/admin/${deleteDish.categorieId}`);
    } catch (error) {
        console.error(error);
    }
}
