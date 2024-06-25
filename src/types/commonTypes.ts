import { ICart } from "./reduxTypes"

export interface IResult {
    message: string
    error?: string
    body?: ICart
}