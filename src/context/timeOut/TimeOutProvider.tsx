'use client'

import React, {
    useCallback,
    useEffect,
    useMemo,
} from "react";
import { TimeOutContext } from "./context";
import { TIMEOUT } from "@/lib/constant";

// провайдер для таймаута запросов в 5 минут от спама запросов
// проверяет вышло время и записывает новый таймаут при запросе
// компоненты: order, orderForm, orderSuccess
export default function TimeOutProvider({ children }: {
    children: React.ReactNode
}) {   

    useEffect(() => {
        const timeNow = Date.now();
        const timeOut = localStorage.getItem("timeOut");
        // если нет таймера показываем заказ
        if (timeOut === null) {
            return;
        }
        // если таймаут закончен показываем заказ
        if (timeNow - Number(timeOut) > TIMEOUT) {     
            localStorage.removeItem("timeOut");
        } 
    }, []);

    // скрываем заказ только при оформлении
    const setTimout = useCallback((time: number) => {
        localStorage.setItem("timeOut", time.toString());
    }, []);

    // проверка состояния
    const chekTimout = useCallback((timeNow: number): boolean => {
        const timeOut = localStorage.getItem("timeOut");
        // если нет таймера показываем заказ
        if (timeOut === null) {
            return false;
        }
        // если таймаут закончен показываем заказ
        if (timeNow - Number(timeOut) < TIMEOUT) {     
            return true;
        } else {
            localStorage.removeItem("timeOut");
            return false;
        }       
    }, []);

    const contextValue = useMemo(() => ({
        setTimout,
        chekTimout
    }), [setTimout, chekTimout]);

    return (
        <TimeOutContext.Provider value={contextValue}>
            {children}
        </TimeOutContext.Provider>
    )
}