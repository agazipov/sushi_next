import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fsAsync } from 'fs';
import type { Stock } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../../auth/[...nextauth]/route";
import { getSession } from "next-auth/react";
import { headers, cookies } from 'next/headers'

interface TForm extends Stock {
    picture: File
}

export async function POST(req: NextRequest, res: NextResponse) {
    // try {
    //     const session = await getServerSession(req, res, authConfig)
    //     console.log("empty session", session);
        
    //     if (!session) return NextResponse.json({ status: "Access closed" });
    //     return NextResponse.json({ status: "success" });
    // } catch (e: any) {
    //     console.log("error message", e.message);
    //     return NextResponse.json({ status: "fail", data: e });
    // }

    try {
        const cookies = req.cookies.getAll();
        console.log('cookies', cookies);

        const mockRequest = {
            cookies: Object.fromEntries(cookies.map(({ name, value }) => [name, value])),
            headers: Object.fromEntries(req.headers.entries()),
        };

        const session = await getSession();
        console.log("session", session);

        if (!session) return NextResponse.json({ status: "Access closed" });
        return NextResponse.json({ status: "success" });
    } catch (e) {
        return NextResponse.json({ status: "fail", data: e });
    }

    // try {
    //     const data = await req.json();

    //     await prisma.stock.delete({
    //         where: {
    //             id: data.id,
    //         },
    //     });

    //     const filePath = `./public/img_stock/${data.img}`;
    //     try {
    //         await fsAsync.stat(filePath);
    //         await fsAsync.unlink(filePath);
    //         return NextResponse.json({ status: "write and img delete success" });
    //     } catch (error) {
    //         return NextResponse.json({ status: "write delete, img not found" });
    //     }
    // }
    // catch (e) {
    //     return NextResponse.json({ status: "fail", data: e });
    // }
}