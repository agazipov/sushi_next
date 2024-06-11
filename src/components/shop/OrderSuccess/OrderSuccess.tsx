"use client"

import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { ICart } from "@/src/types/reduxTypes";
import classNames from "classnames";
import { useLastOrder } from "@/src/context/LastOrderProvider";
import { useTime } from "@/src/context/TimeOutProvider";

export default function OrderSuccess() {
    const lastOrder = useLastOrder();
    const timeOut = useTime();
    // const [order, setOrder] = useState<ICart>();
    // const [time, setTime] = useState<string>("");
    // const router = useRouter();

    // useLayoutEffect(() => {
    //     const timeNow = Date.now();
    //     const timeOut = localStorage.getItem("timeOut");
    //     const orderStorage = localStorage.getItem("order");
    //     if (orderStorage) {
    //         setOrder(JSON.parse(orderStorage));
    //     }
    //     if (timeOut) {
    //         setTime(JSON.parse(timeOut))
    //     }
    //     if (timeNow - Number(timeOut) > 300000) {
    //         localStorage.removeItem("timeOut");

    //         localStorage.removeItem("order");
    //         router.push('/order');
    //     }
    // }, [])

    if (!lastOrder) {
        return (
            <div className={classNames(styles.orderSuccess, "container")}>Нет информации о прошлом заказе</div>
        )
    }

    return (
        <div className={classNames(styles.orderSuccess, "container")}>
            {!timeOut &&
                <p>Ваш заказ успешно сформирован, через несколько минут с вами свяжется наш оператор для подтверждения заказа</p>
            }
            <div>
                <p>Вы заказали:</p>
                <ul>
                    {lastOrder.buy.map(dish => {
                        return (
                            <li key={dish.id}>{dish.name} - {dish.countByLarge + dish.countByMid} порции</li>
                        )
                    })}
                </ul>
            </div>
            <p>на сумму {lastOrder.price}₽</p>
            {!timeOut && <p>Вы сможете сделать повторный заказ через 5 минут</p>}
        </div>
    )
}