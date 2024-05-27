import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stocks = await prisma.stock.findMany();
        return NextResponse.json(
            stocks,
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            { status: 400 }
        );
    }
}