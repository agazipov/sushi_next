import { createListenerMiddleware } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { cartActions } from './cart';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: cartActions.addCart,
    effect: (_action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
});

listenerMiddleware.startListening({
    actionCreator: cartActions.delCart,
    effect: (_action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
});

listenerMiddleware.startListening({
    actionCreator: cartActions.delivery,
    effect: (_action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
});

listenerMiddleware.startListening({
    actionCreator: cartActions.clearCart,
    effect: (action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
});

export { listenerMiddleware };