"use client"

import { Button } from 'react-bootstrap';
import Image from "next/image";
import styles from "./styles.module.css";
import { delPicture } from "@/src/app/api/auth/[...nextauth]/actionPicture";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import processResForStock from '@/lib/processResForStock';

export default function GalleryList({ pictures }: { pictures: string[] }) {
    const router = useRouter();

    const handleDelete = async (img: string) => {
        const result = await delPicture(img);
        toast(processResForStock(result.message));
        router.refresh();
    }

    return (
        <div className={styles.gallery__list}>
            {pictures.map(img => {
                return (
                    <div className={styles.gallery__img} key={img}>
                        <Image width={150} height={150} src={`/img_dishes/${img}`} alt={img} />
                        <p>{img}</p>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(img)}>Удалить</Button>
                    </div>
                )
            })}
            <Toaster />
        </div>
    )
}