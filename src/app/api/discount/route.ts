import { prisma } from "@/lib/prisma";
import { IReqFindNumber } from "@/src/types/commonTypes";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const number = searchParams.get('number');
        const validNumber = "+" + number?.trim();

        // скидка скилька
        const discount: IReqFindNumber = await prisma.discount.findUnique({
            where: {
                phone: validNumber ?? undefined,
            }
        })

        return NextResponse.json(
            { message: "number find", body: discount },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}