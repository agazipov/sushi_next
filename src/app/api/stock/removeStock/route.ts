import { NextResponse, NextRequest } from "next/server";
import { promises as fsAsync } from 'fs';
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // проверка на сессию
        const cookies = req.cookies.getAll();
        const mockRequest = {
            cookies: Object.fromEntries(cookies.map(({ name, value }) => [name, value])),
            headers: Object.fromEntries(req.headers.entries()),
        };
        const session = await getSession({req: mockRequest});
        if (!session) {
            return NextResponse.json({ message: "Access closed"}, { status: 403 });
        } else {
            // уаляем из базы (передавал все тело в запросе, так-как нужно имя картинки)
            const data = await req.json();
            await prisma.stock.delete({
                where: {
                    id: data.id,
                },
            });
            const filePath = `./public/img_stock/${data.img}`;
            try {
                // ищем картинку и удаляем если есть
                await fsAsync.stat(filePath);
                await fsAsync.unlink(filePath);
                return NextResponse.json({ message: "write and img delete success"}, { status: 200 });
            } catch (error) {
                return NextResponse.json({ message: "write delete, img not found"}, { status: 200 });
            }
        }
    } catch (e) {
        return NextResponse.json({message: "request processing error", data: e}, { status: 500 });
    }
}