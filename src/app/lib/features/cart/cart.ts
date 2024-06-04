import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICart } from "@/src/types/reduxTypes";
import { Dish } from "@prisma/client";
import { addBuyForCart, delBuyForCart } from './libs';
import { RootState } from '../../store';

const initialState: ICart = {
    price: 0,
    countDishes: 0,
    buy: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        hydration: (_state, { payload }: PayloadAction<ICart>) => payload,
        addCart: (state, { payload }: PayloadAction<Dish>) => { //добавить счетчик общего прайса в функцию**
            // общая цена в зависимости от порции
            const checkSize = payload.select === 'mid';
            state.price = checkSize ? state.price + payload.price_for_mid! : state.price + payload.price_for_large!;

            addBuyForCart(state, payload, checkSize);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        delCart: (state, { payload }: PayloadAction<Dish>) => {
            // общая цена в зависимости от порции
            const checkSize = payload.select === 'mid';
            
            delBuyForCart(state, payload, checkSize);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCart: () => {
            localStorage.removeItem("cart");
            return initialState;
        },
    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectDishAmount = (state: RootState, { id }: Dish) =>
    selectCart(state).buy.find((dish: Dish) => dish.id === id) || null;