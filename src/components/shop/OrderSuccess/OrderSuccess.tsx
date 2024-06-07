"use client"

import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { ICart } from "@/src/types/reduxTypes";
import classNames from "classnames";

export default function OrderSuccess() {
    const [order, setOrder] = useState<ICart>();
    const [time, setTime] = useState<string>();
    const router = useRouter();

    useLayoutEffect(() => {
        const timeNow = Date.now();
        const timeOut = localStorage.getItem("timeOut");
        const orderStorage = localStorage.getItem("order");
        if (orderStorage) {
            setOrder(JSON.parse(orderStorage));
        }
        if (timeOut) {
            setTime(JSON.parse(timeOut))
        }
        if (timeNow - Number(timeOut) > 300000) {
            // dispatch(orderActions.clearOrder());
            // localStorage.removeItem("order");
            localStorage.removeItem("timeOut");
            // router.push('/order');
        }
    }, [])

    if (!order) {
        return (
            <div>Заказ не оформлен</div>
        )
    }

    return (
        <div className={classNames(styles.orderSuccess, "container")}>
            {time &&
                <p>Ваш заказ успешно сформирован, через несколько минут с вами свяжется наш оператор для подтверждения заказа</p>
            }
            <div>
                <p>Вы заказали:</p>
                <ul>
                    {order.buy.map(dish => {
                        return (
                            <li key={dish.id}>{dish.name} - {dish.countByLarge + dish.countByMid} порции</li>
                        )
                    })}
                </ul>
            </div>
            <p>на сумму {order.price}₽</p>
            {time && <p>Вы сможете сделать повторный заказ через 5 минут</p>}
        </div>
    )
}