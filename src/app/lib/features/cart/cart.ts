import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICart, IDishModify } from "@/src/types/reduxTypes";
import { Dish } from "@prisma/client";
import { addBuyForCart, delBuyForCart } from './libs';
import { RootState } from '../../store';
import { fetchDiscount } from './thunk/fetchDiscount';

const initialState: ICart = {
    price: 0,
    countDishes: 0,
    delivery: false,
    paidDelivery: false,
    discount: null,
    buy: [],
    loading: false,
    error: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        hydration: (_state, { payload }: PayloadAction<ICart>) => payload,
        addCart: (state, { payload }: PayloadAction<IDishModify>) => { //добавить счетчик общего прайса в функцию**
            // общая цена в зависимости от порции
            const checkSize = payload.select === 'mid';
            if (state.discount) {
                const newPrice = checkSize
                    ? payload.price_for_mid! * ((100 - state.discount) / 100)
                    : payload.price_for_large! * ((100 - state.discount) / 100);

                state.price += Math.round(newPrice);
            } else {
                state.price += checkSize ? payload.price_for_mid! : payload.price_for_large!;
            }
            // пострелизный костыль для доп фичи (бесплатная доставка от 600)
            // реализован здесь так как есть возможность менять кол-во блюд на странице заказа
            if (state.paidDelivery && state.price >= 600) {
                state.paidDelivery = false;
            }
            addBuyForCart(state, payload, checkSize);
        },
        delCart: (state, { payload }: PayloadAction<Dish>) => {
            // общая цена в зависимости от порции
            const checkSize = payload.select === 'mid';
            delBuyForCart(state, payload, checkSize);
            // очистка стейта при отсутствии блюд
            if (state.countDishes === 0) {
                state.price = 0;
                state.paidDelivery = false;
                state.delivery = false;
                state.discount = null;
                return;
            }
            if (state.discount) {
                const newPrice = checkSize
                    ? payload.price_for_mid! * ((100 - state.discount) / 100)
                    : payload.price_for_large! * ((100 - state.discount) / 100);

                state.price -= Math.round(newPrice);
            } else {
                state.price -= checkSize ? payload.price_for_mid! : payload.price_for_large!;
            }
            // добавить платную доставку
            if (state.delivery && !state.paidDelivery && state.price < 600) {
                state.paidDelivery = true;
            }
        },
        delivery: (state, { payload }: PayloadAction<boolean>) => {
            if (payload) {
                if (state.price >= 600) {
                    state.paidDelivery = false;
                } else {
                    state.paidDelivery = true;
                }
                state.delivery = true;
            } else {
                if (state.paidDelivery) {
                    state.paidDelivery = false;
                }
                state.delivery = false;
            }
        },
        applyDiscount: (state, { payload }: PayloadAction<number>) => {
            state.discount = payload;
            const priceWithoutDiscount = state.buy.reduce((acc, dish) => {
                return acc + (dish.countByLarge * dish.price_for_large) + (dish.countByMid * dish.price_for_mid);
            }, 0);
            state.price = Math.round(priceWithoutDiscount * ((100 - payload) / 100));
            if (state.delivery) {
                if (state.price >= 600) {
                    state.paidDelivery = false;
                } else {
                    state.paidDelivery = true;
                }
            }
        },
        removeDiscount: (state) => {
            if (!state.discount) return;
            state.discount = null;
            state.price = state.buy.reduce((acc, dish) => {
                return acc + (dish.countByLarge * dish.price_for_large) + (dish.countByMid * dish.price_for_mid);
            }, 0);
            if (state.delivery) {
                if (state.price >= 600) {
                    state.paidDelivery = false;
                } else {
                    state.paidDelivery = true;
                }
            }
        },
        clearCart: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDiscount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiscount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchDiscount.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch discount';
        });
    },
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectDishAmount = (state: RootState, { id }: Dish) =>
    selectCart(state).buy.find((dish: Dish) => dish.id === id) || null;

export const STATUSES = {
    idle: "idle",
    pending: "pending",
    failed: "failed",
    finished: "finished",
    alreadyLoaded: "alreadyLoaded",
};