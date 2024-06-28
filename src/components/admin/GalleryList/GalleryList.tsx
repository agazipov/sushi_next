"use client"

import Image from "next/image";
import styles from "./styles.module.css";
import classNames from "classnames";

export default function GalleryList({ pictures }: { pictures: string[] }) {

    return (
        <div className={classNames(styles.root, 'container')}>
            <h3>Галерея</h3>
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
        </div>
    )
}