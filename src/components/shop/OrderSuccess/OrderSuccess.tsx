"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { ICart } from "@/src/types/reduxTypes";

export default function OrderSuccess() {
    const [order, setOrder] = useState<ICart>();
    const router = useRouter();

    useEffect(() => {
        const timeNow = Date.now();
        const timeOut = localStorage.getItem("timeOut");
        const orderStorage = localStorage.getItem("order");
        if (orderStorage) {
            setOrder(JSON.parse(orderStorage));
        }
        if (timeNow - Number(timeOut) > 60000) {
            // dispatch(orderActions.clearOrder());
            localStorage.removeItem("order");
            localStorage.removeItem("timeOut");
            router.push('/order');
        }
    }, [])

    if (!order) {
        return (
            <div>Заказ не оформлен</div>
        )
    }

    return (
        <div className={styles.orderSuccess}>
            <p>Ваш заказ успешно сформирован, через несколько минут с вами свяжется наш оператор для подтверждения</p>
            <p>Вы заказали:</p>
            {order.buy.map(dish => {
                return (
                    <div key={dish.id}>{dish.name}</div>
                )
            })}
            <p>Вы сможете сделать повторный заказ через 5 минут</p>
        </div>
    )
}