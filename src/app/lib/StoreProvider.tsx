"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { cartActions } from "./features/cart/cart";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    // создаем экземпляр хранилища при первом рендеринге
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    // защита от гидрации при инициализации стора
    useEffect(() => {
        const getCartFromLocalStorage = () => {
            try {
                const persistedState = localStorage.getItem("cart");
                if (persistedState) {
                    return JSON.parse(persistedState);
                }
            } catch (e) {
                console.log(e);
            }
            return null;
        };

        const cart = getCartFromLocalStorage();
        if (cart) {
            storeRef.current!.dispatch(cartActions.hydration(cart));
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>
}