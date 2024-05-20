"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import type { Stock } from "@prisma/client";

export async function createStoks(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return;

    const { id, title, body, show,  img } = Object.fromEntries(data) as unknown as Stock;

    await prisma.stock.create({
        data: {
            title,
            body,
            show,
            img,
        },
    });
    
    revalidatePath(`/admin`);
    redirect(`/admin`);
}
export async function updateStoks(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return;

    const { id, title, body, show,  img } = Object.fromEntries(data) as unknown as Stock;

    await prisma.stock.update({
        where: {
            id,
        },
        data: {
            title,
            body,
            show,
            img,
        },
    });

    revalidatePath(`/admin`);
    redirect(`/admin`);
}

export async function removeStoks(id: string) {
    const session = await getServerSession(authConfig);
    if (!session) return;

    await prisma.stock.delete({
        where: {
            id,
        },
    });

    revalidatePath(`/admin`);
    redirect(`/admin`);
}