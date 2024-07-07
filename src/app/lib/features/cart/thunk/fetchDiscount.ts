import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { cartActions } from '../cart';

export const fetchDiscount = createAsyncThunk(
    'cart/fetchDiscount',
    async (number: string, { dispatch }) => {
        try {
            const response = await axios.get(`https://fish-rice.ru/api/discount?number=${number}`);
            const discount = response.data.body;
            if (!discount) {
                dispatch(cartActions.removeDiscount());
                return;
            }
            dispatch(cartActions.applyDiscount(discount.discount));
        } catch (error) {
            console.error('Failed to fetch discount:', error);
        }
    }
);