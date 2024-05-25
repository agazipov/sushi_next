import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { Readable } from "stream";
import type { Stock } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

const pump = promisify(pipeline);

interface TForm extends Stock {
    picture: File;
}

interface IData {
    title: string
    body: string
    show: boolean
    img?: string
}

//** обновляет запись, если картинка существует - оставляет её, иначе - записывает её
export async function POST(req: NextRequest) {
    try {
        // проверка на сессию
        const cookies = req.cookies.getAll();
        const mockRequest = {
            cookies: Object.fromEntries(
                cookies.map(({ name, value }) => [name, value])
            ),
            headers: Object.fromEntries(req.headers.entries()),
        };
        const session = await getSession({ req: mockRequest });
        if (!session) {
            return NextResponse.json({ message: "Access closed" }, { status: 403 });
        }

        // преобразуем реквест и обновляем запись в БД
        const formData = await req.formData();
        const file = Object.fromEntries(formData) as unknown as TForm;
        const check = (file.show as unknown as string) === "true" ? true : false;
        
        // если не надо менять картинку
        const data: IData = {
            title: file.title,
            body: file.body,
            show: check,
        };
        if (file.picture.size !== 0) {
            data.img = file.picture.name;
        }

        await prisma.stock.update({
            where: {
                id: file.id,
            },
            data: data,
        });

        const filePath = `./public/img_stock/${file.picture.name}`;
        // ищем файл
        try {
            const fileExist = fs.existsSync(filePath);
            if (!fileExist) {
                const blob = await file.picture!.arrayBuffer();
                const readableStream = new Readable();
                readableStream.push(Buffer.from(blob));
                readableStream.push(null);
                await pump(readableStream, fs.createWriteStream(filePath));
                return NextResponse.json(
                    { message: "file update" },
                    { status: 200 }
                );
            }
            return NextResponse.json(
                { message: "file update, picture exist" },
                { status: 200 }
            );
        } catch (error: any) {
            return NextResponse.json(
                { message: "file update, picture not recorded", error: error.message },
                { status: 206 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { message: "request processing error", data: error },
            { status: 500 }
        );
    }
}
