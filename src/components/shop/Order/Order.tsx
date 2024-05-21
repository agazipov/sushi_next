"use client"

import { RootState } from '@/src/app/lib/store';
import { selectCart } from '@/src/app/lib/features/cart/cart';
import { useAppSelector, useAppDispatch } from '@/src/app/lib/hooks';
import { fetchTelegram } from '@/src/services/telegram';
import { cartActions } from '@/src/app/lib/features/cart/cart';
import { useRouter } from 'next/navigation';
import { parsedOrderForString } from '@/lib/parsedOrderForString';
import OrderList from "../OrderList/OrderList";
import OrderForm from "../OrderForm/OrderForm";
import styles from "./styles.module.css";
import classNames from "classnames";
import {useCallback} from "react";

export default function Order() {
    const cart = useAppSelector((state: RootState) => selectCart(state));

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = useCallback((data: FormData) => {
        const dataObj = Object.fromEntries(data) as unknown as TOrder;
        const formedOrder = parsedOrderForString(dataObj, cart);
        console.log("callback", formedOrder);
        
    }, [cart])
    // function handleSubmit(data: FormData) {
    //     const dataObj = Object.fromEntries(data) as unknown as TOrder;
    //     const formedOrder = parsedOrderForString(dataObj, cart);

    //     try {
    //         fetchTelegram(formedOrder)
    //             .then((response) => {
    //                 router.push('/order/success');
    //                 dispatch(cartActions.clearCart())
    //             })
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // };

    if (cart.buy.length === 0) {
        return (
            <div className={classNames(styles.order__not, "container")}>У вас пока нет заказов</div>
        )
    }

    return (
        <section className={classNames(styles.order, "container")}>
            <OrderForm onSubmit={handleSubmit}/>
            <OrderList cart={cart} />
        </section>
    )
}