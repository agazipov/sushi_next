"use server";

import { prisma } from "@/lib/prisma";
import type { Dish } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authConfig } from "../api/auth/[...nextauth]/route";

export async function createDish(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return;

    const { name, compound, price_for_large, price_for_mid, img, categorieId } = Object.fromEntries(data) as unknown as Omit<Dish, "id">;
    const PfLToNumber = Number(price_for_large);
    const PfMToNumber = Number(price_for_mid);

    const dish = await prisma.dish.create({
        data: {
            name,
            compound,
            price_for_large: PfLToNumber,
            price_for_mid: PfMToNumber,
            img,
            categorieId,
        },
    });

    redirect(`/admin/${dish.categorieId}`);
}

export async function updateDish(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return;

    const { id, name, compound, price_for_large, price_for_mid, img } = Object.fromEntries(data) as unknown as Dish;
    const PfLToNumber = Number(price_for_large);
    const PfMToNumber = Number(price_for_mid);

    const dish = await prisma.dish.update({
        where: {
            id,
        },
        data: {
            name,
            compound,
            price_for_large: PfLToNumber,
            price_for_mid: PfMToNumber,
            img,
        },
    });

    revalidatePath(`/admin/${dish.categorieId}`);
    redirect(`/admin/${dish.categorieId}`);
}
