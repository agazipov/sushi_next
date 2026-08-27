import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function requiredEnv(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing env ${name}`);
    }
    return value;
}

function getClient() {
    const tenantId = requiredEnv("S3_TENANT_ID");
    const keyId = requiredEnv("S3_KEY_ID");

    return new S3Client({
        region: process.env.S3_REGION || "ru-central-1",
        endpoint: process.env.S3_ENDPOINT || "https://s3.cloud.ru",
        forcePathStyle: false,
        credentials: {
            // cloud.ru: Access Key ID = tenant_id:key_id
            accessKeyId: `${tenantId}:${keyId}`,
            secretAccessKey: requiredEnv("S3_KEY_SECRET"),
        },
        requestChecksumCalculation: "WHEN_REQUIRED",
        responseChecksumValidation: "WHEN_REQUIRED",
    });
}

function getBucket() {
    return process.env.S3_BUCKET || "fish-rice-bucket";
}

export function toObjectKey(originalName: string, used: Set<string>) {
    const base = originalName.split(/[/\\]/).pop() || "image";
    const withoutExt = base.replace(/\.[^.]+$/, "");
    const safe = withoutExt
        .replace(/[/\\]/g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9._-]/g, "")
        || "image";

    let key = `${safe}.webp`;
    let n = 2;
    while (used.has(key)) {
        key = `${safe}-${n}.webp`;
        n += 1;
    }
    used.add(key);
    return key;
}

export async function convertToWebp(buffer: Buffer) {
    const image = sharp(buffer).rotate();
    const meta = await image.metadata();
    if (!meta.format || !["jpeg", "png", "webp"].includes(meta.format)) {
        throw new Error("Разрешены только jpeg, png и webp");
    }
    return image
        .resize(500, 500, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
}

export function assertAllowedImage(file: { type: string; size: number; name?: string }) {
    const byMime = ALLOWED_TYPES.has(file.type);
    const name = (file.name || "").toLowerCase();
    const byExt = name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png") || name.endsWith(".webp");
    if (!byMime && !byExt) {
        throw new Error("Разрешены только jpeg, png и webp");
    }
    // Safety cap so a huge dump cannot OOM the Node process.
    // Typical phone photos are well below this.
    const maxBytes = 25 * 1024 * 1024;
    if (file.size > maxBytes) {
        throw new Error("Файл слишком большой (больше 25 МБ)");
    }
}

export async function uploadObject(key: string, body: Buffer) {
    const client = getClient();
    const params = {
        Bucket: getBucket(),
        Key: key,
        Body: body,
        ContentType: "image/webp" as const,
    };
    try {
        await client.send(new PutObjectCommand({ ...params, ACL: "public-read" }));
    } catch {
        await client.send(new PutObjectCommand(params));
    }
    return key;
}

export async function deleteObject(key: string) {
    const client = getClient();
    await client.send(new DeleteObjectCommand({
        Bucket: getBucket(),
        Key: key,
    }));
}

export async function listObjectKeys() {
    const client = getClient();
    const keys: string[] = [];
    let continuationToken: string | undefined;

    do {
        const result = await client.send(new ListObjectsV2Command({
            Bucket: getBucket(),
            ContinuationToken: continuationToken,
        }));
        for (const item of result.Contents || []) {
            if (item.Key && !item.Key.endsWith("/")) {
                keys.push(item.Key);
            }
        }
        continuationToken = result.IsTruncated ? result.NextContinuationToken : undefined;
    } while (continuationToken);

    return keys;
}
