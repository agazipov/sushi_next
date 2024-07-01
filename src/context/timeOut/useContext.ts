import { useContext } from "react";
import { TimeOutContext } from "./context";

export const useSetTime = () => useContext(TimeOutContext).setTimout;
export const useChekTime = () => useContext(TimeOutContext).chekTimout;