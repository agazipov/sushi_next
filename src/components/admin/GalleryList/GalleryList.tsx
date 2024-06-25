"use client"

import Image from "next/image";
import styles from "./styles.module.css";

export default function GalleryList({ pictures }: { pictures: string[] }) {

    return (
        <div className={styles.gallery__list}>
            <h3>Галерея</h3>
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