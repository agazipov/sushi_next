"use client"

import { RootState } from '@/src/app/lib/store';
import { selectCart } from '@/src/app/lib/features/cart/cart';
import { useAppSelector } from '@/src/app/lib/hooks';
import OrderList from "../OrderList/OrderList";
import OrderForm from "../OrderForm/OrderForm";
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChekTime } from '@/src/context/TimeOutProvider';
import classNames from "classnames";
import styles from "./styles.module.scss";
import EmptyContent from '../EmptyContent/EmptyContent';

export default function Order() {
    const cart = useAppSelector((state: RootState) => selectCart(state));
    const router = useRouter();
    const chekTimeOut = useChekTime();

    useLayoutEffect(() => {
        const chek = chekTimeOut(Date.now());
        if (chek) {
            router.push('/order/success');
        }
    }, [chekTimeOut, router]);

    return (
        <section className={classNames(styles.order, "container")}>
            {cart.buy.length === 0 ?
                <EmptyContent>
                    У вас пока нет заказов
                </EmptyContent>
                :
                <>
                    <h3>У вас в корзине {cart.countDishes} блюд(а) за {cart.price}₽</h3>
                    <div className={styles.order__content}>
                        <OrderForm cart={cart} />
                        <OrderList cart={cart} />
                    </div>
                </>
            }
        </section>
    )
}