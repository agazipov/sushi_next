'use client'

import React, {
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from "react";

const context = React.createContext<boolean>(false);
const setterContext = React.createContext((time: number) => { });

export const useTime = () => useContext(context);
export const useSetTime = () => useContext(setterContext);

export default function TimeOutProvider({ children }: {
    children: React.ReactNode
}) {
    const [time, setTime] = useState<boolean>(false);

    useLayoutEffect(() => {
        const timeNow = Date.now();
        const timeOut = localStorage.getItem("timeOut");
        if (!timeOut) {
            setTime(true);
            return;
        }
        if (timeNow - Number(timeOut) > 300000) {           
            localStorage.removeItem("timeOut");
            setTime(true);
        }
    }, [])

    const writeTimout = useCallback((time: number) => {
        localStorage.setItem("timeOut", time.toString());
        setTime(false);
    }, [])

    return (
        <context.Provider value={time}>
            <setterContext.Provider value={writeTimout}>
                {children}
            </setterContext.Provider>
        </context.Provider>
    )
}