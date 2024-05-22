import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';
import type { Stock } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const pump = promisify(pipeline);

interface TForm extends Stock {
    picture: File
} 

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = req.body;
        console.log(formData);
        
        // const file = Object.fromEntries(formData) as unknown as TForm;

        // await prisma.stock.delete({
        //     where: {
        //         id: file.id,
        //     },
        // });

        // const filePath = `./public/img_stock/${file.picture.name}`;
        // try {
        //     await fsAsync.stat(filePath);
        //     await fsAsync.unlink(filePath);
        //     return NextResponse.json({ status: "write and img delete success" });
        // } catch (error) {
        //     return NextResponse.json({ status: "write delete, img not found" });
        // }
        return NextResponse.json({ status: "write delete, img not found" });
    }
    catch (e) {
        return NextResponse.json({ status: "fail", data: e })
    }
}