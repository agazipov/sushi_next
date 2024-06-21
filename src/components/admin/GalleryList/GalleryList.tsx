"use client"

import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from 'next/navigation';

export default function GalleryList({ pictures }: { pictures: string[] }) {
    const router = useRouter();

    return (
        <div className={styles.gallery__list}>
            {pictures.map(img => {
                return (
                    <div className={styles.gallery__img} key={img}>
                        <Image width={150} height={150} src={`https://fish-rice-bucket.s3.cloud.ru/${img}`} alt={img} />
                        <p>{img}</p>
                    </div>
                )
            })}
        </div>
    )
}