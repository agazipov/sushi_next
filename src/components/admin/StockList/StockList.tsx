"use client"

import type { Stock } from "@prisma/client";
import { useState } from "react";
import ModalWrap from "../ModalWrap/ModalWrap";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import classNames from "classnames";
import StockForm from "../StockForm/StockForm";
import { removeStock } from "@/src/app/api/auth/[...nextauth]/actionStock";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import processResForStock from "@/lib/processResForStock";
import Image from "next/image";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";

export default function StockList({ stocks }: { stocks: Stock[] }) {
    const [showForm, setShowForm] = useState<Stock | boolean>(false);
    const [showDelete, setShowDelete] = useState<Stock | null>(null);
    const router = useRouter();

    const handleRemove = async (stock: Stock) => {
        const result = await removeStock(stock);
        toast(processResForStock(result.message));
        router.refresh();
    }

    return (
        <div className={classNames(styles.root, "container")}>
            <div className={styles.stock__header}>
                <h3>Управление акциями</h3>
                <Button onClick={() => setShowForm(true)}>Добавить акцию</Button>
            </div>

            {stocks ?
                <div className={styles.stocks__list}>
                    {stocks.map((stock) => {
                        return (
                            <div className={styles.stock__copy} key={stock.id}>
                                <u>Название акции:</u>
                                <p>{stock.title}</p>
                                <div className={styles.stock__body}>
                                    <u>Текст акции:</u>
                                    <p>{stock.body}</p>
                                </div>
                                {stock.img ?
                                    <div>
                                        <u>Изображение:</u>
                                        <p>{stock.img}</p>
                                        <Image
                                            width={100}
                                            height={100}
                                            src={`https://fish-rice-bucket.s3.cloud.ru/${stock.img}`}
                                            alt={stock.img}
                                        />
                                    </div>
                                    :
                                    <p>Нет изображения</p>
                                }
                                <div>
                                    <u>Отображение на сайте:</u>
                                    <p> {stock.show ? "Показан" : "Скрыт"}</p>
                                </div>
                                <div className={styles.stock__btn_group}>
                                    <Button onClick={() => setShowForm(stock)} size="sm">Изменить</Button>
                                    <Button onClick={() => setShowDelete(stock)} size="sm" variant="danger">Удалить</Button>
                                </div>
                            </div>)
                    })
                    }
                </div>
                :
                <div>Нет акций</div>
            }
            <ModalWrap show={showForm} setShow={setShowForm} type="stock">
                <StockForm
                    stock={typeof showForm === "object" ? showForm : null}
                    setShow={setShowForm}
                    setMessage={(e) => toast(e)}
                />
            </ModalWrap>
            <ConfirmDelete<Stock>
                show={showDelete}
                setShow={setShowDelete}
                fnDelete={handleRemove}
            />
            <Toaster />
        </div>
    )
}