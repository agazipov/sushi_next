"use client"

import { RootState } from '@/src/app/lib/store';
import { selectCart } from '@/src/app/lib/features/cart/cart';
import { useAppSelector } from '@/src/app/lib/hooks';
import OrderList from "../OrderList/OrderList";
import OrderForm from "../OrderForm/OrderForm";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Order() {
    const cart = useAppSelector((state: RootState) => selectCart(state));
    const router = useRouter();

    useEffect(() => {
        const timeNow = Date.now();
        let timeOut = localStorage.getItem("timeOut");
        if (timeNow - Number(timeOut) < 60000) {
            router.push('/order/success');
        } 
    }, [])

    if (cart.buy.length === 0) {
        return (
            <div className={classNames(styles.order__not, "container")}>У вас пока нет заказов</div>
        )
    }

    return (
        <section className={classNames(styles.order, "container")}>
            <h3>У вас в корзине {cart.countDishes} блюд(а) за {cart.price}₽</h3>
            <div className={styles.order__content}>
                <OrderForm cart={cart}/>
                <OrderList cart={cart} />
            </div>
        </section>
    )
}