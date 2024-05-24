import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from "fs";
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

export async function POST(req: NextRequest, res: NextResponse) {
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
    } else {
      // преобразуем реквест и обновляем запись в БД
      const formData = await req.formData();
      const file = Object.fromEntries(formData) as unknown as TForm;
      const check = (file.show as unknown as string) === "true" ? true : false;
      await prisma.stock.update({
        where: {
          id: file.id,
        },
        data: {
          title: file.title,
          body: file.body,
          show: check,
          img: file.picture.name,
        },
      });
      const filePath = `./public/img_stock/${file.picture.name}`;
      try {
        const fileExist = fs.existsSync(filePath);

        // eslint-disable-next-line no-console
        console.log('fileExist', fileExist);

        if (!fileExist) {
          const blob = await file.picture!.arrayBuffer();
          const readableStream = new Readable();
          readableStream.push(Buffer.from(blob));
          readableStream.push(null);

          await pump(readableStream, fs.createWriteStream(filePath));
          return NextResponse.json(
            { message: "picture change" },
            { status: 200 }
          );
        }

        return NextResponse.json(
          { message: "picture exists" },
          { status: 201 }
        );
      } catch (error) {
        console.log("error", error);
      }
    }
  } catch (e) {
    return NextResponse.json(
      { message: "request processing error", data: e },
      { status: 500 }
    );
  }
}
