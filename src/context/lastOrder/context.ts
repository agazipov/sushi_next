import { ICart } from "@/src/types/reduxTypes";
import React from "react";

interface LastOrderContextType {
    order: ICart | null;
    setOrder: (cart: ICart) => void;
}

export const LastOrderContext = React.createContext<LastOrderContextType>({
    order: null,
    setOrder: () => {},
});
