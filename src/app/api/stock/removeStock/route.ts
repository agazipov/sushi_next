import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from 'fs';
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

//** добавляет запись, если картинка существует - оставляет её, иначе - записывает её
export async function POST(req: NextRequest) {
    try {
        // проверка на сессию
        const cookies = req.cookies.getAll();
        const mockRequest = {
            cookies: Object.fromEntries(cookies.map(({ name, value }) => [name, value])),
            headers: Object.fromEntries(req.headers.entries()),
        };
        const session = await getSession({ req: mockRequest });
        if (!session) {
            return NextResponse.json({ message: "Access closed" }, { status: 403 });
        }

        // уаляем из базы
        const data = await req.json();
        await prisma.stock.delete({
            where: {
                id: data.id,
            },
        });
        
        const filePath = `./public/img_stock/${data.img}`;
        
        // ищем картинку и удаляем если есть
        try {
            const fileExist = fs.existsSync(filePath);
            console.log('fileExist', fileExist);
            if (fileExist) {
                await fsAsync.unlink(filePath);
                return NextResponse.json({ message: "file delete" }, { status: 200 });
            }
            return NextResponse.json({ message: "file delete, picture not found" }, { status: 200 });
        } catch (error: any) {
            return NextResponse.json(
                { message: "file delete, picture was not deleted", error: error.message },
                { status: 206 }
            )
        }
    } catch (e) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 });
    }
}