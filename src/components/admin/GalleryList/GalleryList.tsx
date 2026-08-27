"use client"

import Image from "next/image";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import classNames from "classnames";
import { s3ImageUrl } from "@/lib/storage";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";

export default function GalleryList({ pictures }: { pictures: string[] }) {
    const [items, setItems] = useState(pictures);
    const [toDelete, setToDelete] = useState<string | null>(null);
    const [copied, setCopied] = useState("");
    const [error, setError] = useState("");

    const handleCopy = async (img: string) => {
        await navigator.clipboard.writeText(img);
        setCopied(img);
    };

    const handleDelete = async (img: string) => {
        setError("");
        const response = await fetch(`/api/picture?key=${encodeURIComponent(img)}`, {
            method: "DELETE",
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
            setError(result.message || "Не удалось удалить");
            return;
        }
        setItems((prev) => prev.filter((item) => item !== img));
    };

    return (
        <div className={classNames(styles.root, "container")}>
            <h3>Галерея</h3>
            <p>Удаление файлов из хранилища. Имя можно скопировать и вставить в форму блюда или акции.</p>
            {items.length === 0 && (
                <p>Список пуст: в блюдах и акциях нет имён файлов, а полный список бакета закрыт.</p>
            )}
            {error && <p className="text-danger">{error}</p>}
            <div className={styles.gallery__list}>
                {items.map((img) => (
                    <div className={styles.gallery__img} key={img}>
                        <Image width={150} height={150} src={s3ImageUrl(img)} alt={img} />
                        <p>{img}</p>
                        <div className="d-flex justify-content-center gap-2">
                            <Button size="sm" variant="outline-secondary" onClick={() => handleCopy(img)}>
                                {copied === img ? "Скопировано" : "Копировать"}
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => setToDelete(img)}>
                                Удалить
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmDelete<string>
                show={toDelete}
                setShow={setToDelete}
                fnDelete={handleDelete}
            />
        </div>
    );
}
