"use server"

import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { checkPassword } from "@/lib/identification";

export default async function actionPassword(data: FormData, userName: string | null | undefined) {
    if (!userName) return "Нет пользователя";
    const { oldpass, newpass } = Object.fromEntries(data) as { oldpass: string, newpass: string };
    if (oldpass === newpass) return "Одинаковое название";

    const user = await prisma.user.findUnique({
        where: { name: userName },
        select: {
            id: true,
            name: true,
            passwordHash: true,
            salt: true
        },
    });
    if (user && user.passwordHash === await checkPassword(oldpass, user.salt)) {
        return "Пароль изменен";
    } else {
        return "Неверный пароль";
    }
}