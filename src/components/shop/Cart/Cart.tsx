"use client"

import { useState } from "react";
import { RootState } from "@/src/app/lib/store";
import { selectCart } from '@/src/app/lib/features/cart/cart';
import { useAppSelector } from "@/src/app/lib/hooks";
import ModalCart from "../ModalCart/ModalCart";
import { Portal } from "../Portal/Portal";
import Modal from "../Modal/Modal";
import styles from "./styles.module.css";
import TestComponent from "../Test/Test";


export default function Cart() {
    const [show, setShow] = useState(false);
    const cart = useAppSelector((state: RootState) => selectCart(state));

    return (
        <div className={styles.cart}>
            <button className={styles.btn} onClick={() => setShow(true)}>
                <svg width="60px" height="60px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#444" d="M14 13.1v-1.1h-9.4l0.6-1.1 9.2-0.9 1.6-6h-12.3l-0.7-3h-3v1h2.2l2.1 8.4-1.3 2.6v1.5c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5-0.7-1.5-1.5-1.5h7.5v1.5c0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5c0-0.7-0.4-1.2-1-1.4z"></path>
                </svg>
                <div className={styles.cart__info}>
                    <span>Кол-во: {cart.countDishes}</span>
                    <span>Цена: {cart.price}</span>
                </div>
            </button>
            {/* <TestComponent /> */}
            {/* <Portal >
                <Modal show={show} setShow={setShow}>
                </Modal>
            </Portal> */}
            <ModalCart show={show} setShow={setShow} />
        </div>
    )
}