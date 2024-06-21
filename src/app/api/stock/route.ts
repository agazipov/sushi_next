import { NextResponse, NextRequest } from "next/server";
import type { Stock } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const stocks = await prisma.stock.findMany();
        return NextResponse.json(
            stocks,
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }
}

//** добавление запись, если картинка существует - не записывает, иначе - записывает её
export async function POST(req: NextRequest) {
    try {
        // преобразуем реквест 
        const formData = await req.formData();
        const file = Object.fromEntries(formData) as unknown as Stock;
        const check = file.show as unknown as string === "true" ? true : false;

        await prisma.stock.create({
            data: {
                title: file.title,
                body: file.body,
                show: check,
                img: file.img,
            },
        });

        return NextResponse.json({ message: "file create" }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 })
    }
}

//** Удаляет запись
export async function DELETE(req: NextRequest) {
    try {
        // уаляем из базы
        const data = await req.json();
        await prisma.stock.delete({
            where: {
                id: data.id,
            },
        });

        return NextResponse.json({ message: "file delete" }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 });
    }
}

//** обновляет запись, если картинка существует - оставляет её, иначе - записывает её
export async function PUT(req: NextRequest) {
    try {
        // преобразуем реквест и обновляем запись в БД
        const formData = await req.formData();
        const file = Object.fromEntries(formData) as unknown as Stock;
        const check = (file.show as unknown as string) === "true" ? true : false;

        await prisma.stock.update({
            where: {
                id: file.id,
            },
            data: {
                title: file.title,
                body: file.body,
                show: check,
                img: file.img
            }
        });

        return NextResponse.json({ message: "file update" }, { status: 200 });
    } catch (error) {
    return NextResponse.json(
        { message: "request processing error", data: error },
        { status: 500 }
    );
}
}
