import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export default async function POST(req: NextRequest, res: NextResponse) {
    try {
        const metric = await req.json()

        // Сохранение метрики в базе данных
        await prisma.metric.create({ data: metric });

        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 405 })
    }
}