'use client'

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ICart } from "../../types/reduxTypes";
import { LastOrderContext } from "./context";

// провайдер для отображения последнего заказа
// компонты: formOrder, orderSuccess
export default function LastOrderProvider({ children }: {
    children: React.ReactNode
}) {
    const [order, setOrder] = useState<ICart | null>(null);

    useEffect(() => {
        const orderStorage = localStorage.getItem("order");
        if (orderStorage) {
            setOrder(JSON.parse(orderStorage));
        }
    }, []);

    const writeOrder = useCallback((cart: ICart) => {
        setOrder(cart);
        localStorage.setItem("order", JSON.stringify(cart));
    }, []);

    const contextValue = useMemo(() => ({
        order,
        setOrder: writeOrder,
    }), [order, writeOrder]);

    return (
        <LastOrderContext.Provider value={contextValue}>
            {children}
        </LastOrderContext.Provider>
    )
}