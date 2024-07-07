import { ICart } from "./reduxTypes";
import { Discount } from "@prisma/client";

export interface IResult {
    message: string
    error?: string
    body?: ICart
}

export type IReqFindNumber =  Discount | null;