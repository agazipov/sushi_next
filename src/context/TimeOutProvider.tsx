'use client'

import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

// const context = React.createContext<boolean>(false);
const setterContext = React.createContext((time: number) => { });
const chekContext = React.createContext((time: number): boolean => true);

// export const useTime = () => useContext(context);
export const useSetTime = () => useContext(setterContext);
export const useChekTime = () => useContext(chekContext);

const TIMEOUT = 300000;

export default function TimeOutProvider({ children }: {
    children: React.ReactNode
}) {   

    useEffect(() => {
        const timeNow = Date.now();
        const timeOut = localStorage.getItem("timeOut");
        // если нет таймера показываем заказ
        if (timeOut === null) {
            // setTime(false);
            return;
        }
        // если таймаут закончен показываем заказ
        if (timeNow - Number(timeOut) > TIMEOUT) {     
            localStorage.removeItem("timeOut");
        } 
    }, []);

    // скрываем заказ только при оформлении
    const writeTimout = useCallback((time: number) => {
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

    return (
            <setterContext.Provider value={writeTimout}>
                <chekContext.Provider value={chekTimout}>
                    {children}
                </chekContext.Provider>
            </setterContext.Provider>
    )
}