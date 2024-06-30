import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICart, IDishModify } from "@/src/types/reduxTypes";
import { Dish } from "@prisma/client";
import { addBuyForCart, delBuyForCart } from './libs';
import { RootState } from '../../store';

const initialState: ICart = {
    price: 0,
    countDishes: 0,
    delivery: false,
    paidDelivery: false,
    buy: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        hydration: (_state, { payload }: PayloadAction<ICart>) => payload,
        addCart: (state, { payload }: PayloadAction<IDishModify>) => { //добавить счетчик общего прайса в функцию**
            // общая цена в зависимости от порции
            const checkSize = payload.select === 'mid';
            state.price = checkSize ? state.price + payload.price_for_mid! : state.price + payload.price_for_large!;
            // пострелизный костыль для доп фичи (бесплатная доставка от 600)
            if (state.paidDelivery && state.price >= 700) {
                state.paidDelivery = false;
                state.price -= 100;
            }
            addBuyForCart(state, payload, checkSize);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        delCart: (state, { payload }: PayloadAction<Dish>) => {
            // общая цена в зависимости от порции
            const checkSize = payload.select === 'mid';
            delBuyForCart(state, payload, checkSize);
            // пострелизный костыль для доп фичи (бесплатная доставка)
            if (state.countDishes === 0) {
                state.price = 0;
                state.paidDelivery = false;
                state.delivery = false;
                localStorage.setItem("cart", JSON.stringify(state));
                return;
            }
            if (state.delivery && !state.paidDelivery && state.price < 600) {
                state.paidDelivery = true;
                state.price += 100;
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        delivery: (state, { payload }: PayloadAction<boolean>) => {
            if (payload) {
                if (state.price >= 600) {
                    state.paidDelivery = false;
                } else {
                    state.paidDelivery = true;
                    state.price += 100;
                }
                state.delivery = true;
            } else {
                if (state.paidDelivery) {
                    state.paidDelivery = false;
                    state.price -= 100;
                }
                state.delivery = false;
            }
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