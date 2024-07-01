import { useContext } from "react";
import { LastOrderContext } from "./context";

export const useLastOrder = () => useContext(LastOrderContext).order;
export const useSetLastOrder = () => useContext(LastOrderContext).setOrder;