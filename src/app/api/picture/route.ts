import { NextResponse, NextRequest } from "next/server";
import xml2js from "xml2js";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/lib/prisma";
import { S3_PUBLIC_URL } from "@/lib/storage";
import {
    assertAllowedImage,
    convertToWebp,
    deleteObject,
    listObjectKeys,
    toObjectKey,
    uploadObject,
} from "@/src/services/s3";

interface ListBucketResult {
    ListBucketResult: {
        Contents?: { Key: string } | { Key: string }[];
    };
}

async function listViaPublicXml() {
    const result = await fetch(`${S3_PUBLIC_URL}/`, { cache: "no-cache" });
    if (!result.ok) {
        throw new Error(`Не удалось получить список картинок (${result.status})`);
    }
    const xmlText = await result.text();
    const cleanedXml = xmlText.replace(/^\s+|\uFEFF/g, "");

    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedResult: ListBucketResult = await new Promise((resolve, reject) => {
        parser.parseString(cleanedXml, (err: unknown, parsed: ListBucketResult) => {
            if (err) {
                reject(err);
            } else {
                resolve(parsed);
            }
        });
    });

    const contents = parsedResult.ListBucketResult?.Contents;
    const items = Array.isArray(contents) ? contents : contents ? [contents] : [];
    return items.map((elem) => elem.Key).filter(Boolean);
}

function s3ErrorMessage(error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    if (/AccessDenied|Access Denied/i.test(message)) {
        return "Нет прав на бакет. Ключу нужны роли s3e.editor и s3e.viewer (или s3e.admin) на fish-rice-bucket.";
    }
    return message || "Ошибка хранилища";
}

async function listFromDatabase() {
    const [dishes, stocks] = await Promise.all([
        prisma.dish.findMany({ select: { img: true } }),
        prisma.stock.findMany({ select: { img: true } }),
    ]);
    const keys = new Set<string>();
    for (const row of [...dishes, ...stocks]) {
        for (const part of row.img.split("/")) {
            if (part) keys.add(part);
        }
    }
    return [...keys].sort();
}

export async function GET() {
    try {
        try {
            const keys = await listObjectKeys();
            return NextResponse.json(keys, { status: 200 });
        } catch (s3Error) {
            console.error("S3 list failed:", s3Error);
            try {
                const keys = await listViaPublicXml();
                return NextResponse.json(keys, { status: 200 });
            } catch (xmlError) {
                console.error("Public list failed:", xmlError);
                const keys = await listFromDatabase();
                return NextResponse.json(keys, { status: 200 });
            }
        }
    } catch (e: unknown) {
        return NextResponse.json({ message: s3ErrorMessage(e) }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) {
            return NextResponse.json({ message: "Access closed" }, { status: 401 });
        }

        const formData = await req.formData();
        const files = formData.getAll("files").filter((item): item is File => item instanceof File);

        if (!files.length) {
            return NextResponse.json({ message: "Файлы не выбраны" }, { status: 400 });
        }

        const used = new Set<string>();
        const keys: string[] = [];

        for (const file of files) {
            assertAllowedImage(file);
            const buffer = Buffer.from(await file.arrayBuffer());
            const webp = await convertToWebp(buffer);
            const key = toObjectKey(file.name, used);
            await uploadObject(key, webp);
            keys.push(key);
        }

        return NextResponse.json({ keys }, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json({ message: s3ErrorMessage(e) }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authConfig);
        if (!session) {
            return NextResponse.json({ message: "Access closed" }, { status: 401 });
        }

        const key = req.nextUrl.searchParams.get("key");
        if (!key || key.includes("..") || key.includes("/")) {
            return NextResponse.json({ message: "Некорректное имя файла" }, { status: 400 });
        }

        await deleteObject(key);
        return NextResponse.json({ key }, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json({ message: s3ErrorMessage(e) }, { status: 500 });
    }
}
