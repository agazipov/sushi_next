"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authConfig } from "../app/api/auth/[...nextauth]/config";
import { Discount } from "@prisma/client";

export async function getDiscounts() {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return;

        return await prisma.discount.findMany();
    } catch (error) {
        console.error(error);
    }
}

export async function addDiscounts(data: FormData) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return;

        const { name, phone, discount: discountForm } = Object.fromEntries(data) as unknown as Omit<Discount, "id">;
        const discount = Number(discountForm);

        await prisma.discount.create({
            data: {
                name,
                phone,
                discount
            }
        });

        revalidatePath(`/admin/discount`);
    } catch (error) {
        console.error(error);
    }
}
export async function updateDiscounts(data: FormData) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return;

        const { id, name, phone, discount: discountForm } = Object.fromEntries(data) as unknown as Discount;
        const discount = Number(discountForm);

        await prisma.discount.update({
            where: { id },
            data: {
                name,
                phone,
                discount
            }
        });
        revalidatePath(`/admin/discount`);
    } catch (error) {
        console.error(error);
    }
}
export async function removeDiscounts(discount: Discount) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) return;

        await prisma.discount.delete({
            where: { id: discount.id }
        });

        revalidatePath(`/admin/discount`);
    } catch (error) {
        console.error(error);
    }
}