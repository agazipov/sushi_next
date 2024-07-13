import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICart, IDishModify } from "@/src/types/reduxTypes";
import { Dish } from "@prisma/client";
import { addBuyForCart, calculatePriceWithDiscount, checkFreeDelivery, delBuyForCart } from './libs';
import { RootState } from '../../store';
import { fetchDiscount } from './thunk/fetchDiscount';
import { INITIAL_STATE } from '@/lib/constant';

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        hydration: (_state, { payload }: PayloadAction<ICart>) => payload,
        addCart: (state, { payload }: PayloadAction<IDishModify>) => {
            const checkSize = payload.select === 'mid';
            const priceToAdd = checkSize ? payload.price_for_mid! : payload.price_for_large!;

            if (state.discount) {
                state.price += calculatePriceWithDiscount(priceToAdd, state.discount);
            } else {
                state.price += priceToAdd;
            }

            if (state.delivery && state.paidDelivery && state.price >= 600) {
                state.paidDelivery = false;
            }

            addBuyForCart(state, payload, checkSize);
        },
        delCart: (state, { payload }: PayloadAction<Dish>) => {
            const checkSize = payload.select === 'mid';
            delBuyForCart(state, payload, checkSize);

            if (state.countDishes === 0) {
                state.price = 0;
                state.paidDelivery = false;
                state.delivery = false;
                state.discount = null;
                return;
                // return {
                //     ...INITIAL_STATE,
                //     loading: state.loading,
                //     error: state.error
                // };
            }

            const priceToSubtract = checkSize ? payload.price_for_mid! : payload.price_for_large!;

            if (state.discount) {
                state.price -= calculatePriceWithDiscount(priceToSubtract, state.discount);
            } else {
                state.price -= priceToSubtract;
            }

            if (state.delivery && !state.paidDelivery && state.price < 600) {
                state.paidDelivery = true;
            }
        },
        delivery: (state, { payload }: PayloadAction<boolean>) => {
            state.delivery = payload;
            if (payload) {
                state.paidDelivery = state.price < 600;
            } else {
                state.paidDelivery = false;
            }
        },
        applyDiscount: (state, { payload }: PayloadAction<number>) => {
            state.discount = payload;
            const priceWithoutDiscount = state.buy.reduce((acc, dish) => {
                return acc + (dish.countByLarge * dish.price_for_large) + (dish.countByMid * dish.price_for_mid);
            }, 0);
            state.price = calculatePriceWithDiscount(priceWithoutDiscount, payload);
            checkFreeDelivery(state);
        },
        removeDiscount: (state) => {
            if (!state.discount) return;
            state.discount = null;
            state.price = state.buy.reduce((acc, dish) => {
                return acc + (dish.countByLarge * dish.price_for_large) + (dish.countByMid * dish.price_for_mid);
            }, 0);
            checkFreeDelivery(state);
        },
        clearCart: () => {
            return INITIAL_STATE;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDiscount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDiscount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchDiscount.rejected, (state, action) => {
            state.loading = false;
            state.error = state.error = action.error.message || 'Failed to fetch discount';
        });
    },
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectDishAmount = (state: RootState, { id }: Dish) =>
    selectCart(state).buy.find((dish: Dish) => dish.id === id) || null;
