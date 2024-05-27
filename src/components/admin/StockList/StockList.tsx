"use client"

import type { Stock } from "@prisma/client";
import { useState } from "react";
import { Portal } from "../../shop/Portal/Portal";
import ModalWrap from "../ModalWrap/ModalWrap";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import classNames from "classnames";
import StockForm from "../StockForm/StockForm";
import { removeStock } from "@/src/app/api/auth/[...nextauth]/actionStock";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import processResForStock from "@/lib/processResForStock";

type Props = {
    stocks: Stock[];
};

export default function StockList({ stocks }: Props) {
    const [show, setShow] = useState<Stock | boolean>(false);
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
                <Button onClick={() => setShow(true)}>Добавить акцию</Button>
            </div>

            {stocks ?
                <div className={styles.stocks__list}>
                    {stocks.map((stock) => {
                        return (
                            <div className={styles.stock__copy} key={stock.id}>
                                <p><u>Название акции:</u> {stock.title}</p>
                                <div className={styles.stock__body}>
                                    <u>Текст акции:</u>
                                    <p>{stock.body}</p>
                                </div>
                                {stock.img ? <p>{stock.img}</p> : <p>Нет изображения</p>}
                                <div><p><u>Отображение:</u> {stock.show ? "Показан" : "Скрыт"}</p></div>
                                <div className={styles.stock__btn_group}>
                                    <Button onClick={() => setShow(stock)} size="sm">Изменить</Button>
                                    <Button onClick={() => handleRemove(stock)} size="sm" variant="danger">Удалить</Button>
                                </div>
                            </div>)
                    })
                    }
                </div>
                :
                <div>Нет акций</div>
            }

            <Portal>
                <ModalWrap show={show} setShow={setShow} >
                    <StockForm
                        stock={typeof show === "object" ? show : null}
                        setShow={setShow}
                        setMessage={(e) => toast(e)}
                    />
                </ModalWrap>
            </Portal>

            <Toaster />
        </div>
    )
}