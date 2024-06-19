"use client"

import {useEffect, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useLastOrder } from "@/src/context/LastOrderProvider";
import { useChekTime } from "@/src/context/TimeOutProvider";

export default function OrderSuccess() {
    const [chek, setChek] = useState<boolean>(false)
    const lastOrder = useLastOrder();
    const chekTimeOut = useChekTime();
    useEffect(() => setChek(chekTimeOut(Date.now())), [chekTimeOut]);

    if (!lastOrder) {
        return (
            <div className={classNames(styles.orderSuccess, "container")}>Нет информации о прошлом заказе</div>
        )
    }

    return (
        <div className={classNames(styles.orderSuccess, "container")}>
            {chek &&
                <p>Ваш заказ успешно сформирован, через несколько минут с вами свяжется наш оператор для подтверждения заказа</p>
            }
            <div>
                <p>Вы заказали:</p>
                <ul className={styles.list}>
                    {lastOrder.buy.map(dish => {
                        return (
                            <li key={dish.id}>{dish.name} - {dish.countByLarge + dish.countByMid} порции</li>
                        )
                    })}
                </ul>
            </div>
            <p>на сумму {lastOrder.price}₽</p>
            {chek && <p>Вы сможете сделать повторный заказ через 5 минут</p>}
        </div>
    )
}