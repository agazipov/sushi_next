export const S3_PUBLIC_URL =
    process.env.NEXT_PUBLIC_S3_PUBLIC_URL || "https://fish-rice-bucket.s3.cloud.ru";

export function s3ImageUrl(key: string) {
    return `${S3_PUBLIC_URL}/${key}`;
}
