'use client'

import React, {
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from "react";
import { ICart } from "../types/reduxTypes";

const context = React.createContext<ICart | null>(null);
const setterContext = React.createContext((cart: ICart) => { });

export const useLastOrder = () => useContext(context);
export const useSetLastOrder = () => useContext(setterContext);

export default function LastOrderProvider({ children }: {
    children: React.ReactNode
}) {
    const [order, setOrder] = useState<ICart | null>(null);

    useLayoutEffect(() => {
        const orderStorage = localStorage.getItem("order");
        if (orderStorage) {
            setOrder(JSON.parse(orderStorage));
        }
    }, [])

    const writeOrder = useCallback((cart: ICart) => {
        setOrder(cart);
        localStorage.setItem("order", JSON.stringify(cart));
    }, [])

    return (
        <context.Provider value={order}>
            <setterContext.Provider value={writeOrder}>
                {children}
            </setterContext.Provider>
        </context.Provider>
    )
}