import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../lib/fetchAPI";

const initialState = {
    items: [],
    totalAmount: 0,
    isLoading: false,
    isError: false,
    errorMessage: ""
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        getTotalAmount: (state, action) => {
            state.totalAmount = state.items.reduce(
                (prev, current) => prev + current.amount,
                0
            );
        },
        closeError: (state, action) => {
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBasket.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = true;
        });
        builder.addCase(getBasket.rejected, (state, action) => {
            state.isLoading = true;
            state.isError = true;
            state.errorMessage = action.payload
        });
        builder.addCase(incrementAmount.fulfilled, (state, action) => {
            const updatedItemsIncrement = state.items.map((el) => {
                if (el._id === action.payload) {
                    return { ...el, amount: el.amount + 1 };
                }
                return el;
            });
            state.items = updatedItemsIncrement;
        });
        builder.addCase(incrementAmount.rejected, (state, action) => {
            state.isError = true
            state.isLoading = true
            state.errorMessage = action.payload
        })
        builder.addCase(decrementAmount.fulfilled, (state, action) => {
            const updatedItemsDecrement = state.items.map((el) => {
                if (el._id === action.payload) {
                    return { ...el, amount: el.amount - 1 };
                }
                return el;
            });
            state.items = updatedItemsDecrement;
        });
        builder.addCase(decrementAmount.rejected, (state, action) => {
            state.isError = true
            state.isLoading = true
            state.errorMessage = action.payload
        })
    }
});

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;

export const getBasket = createAsyncThunk(
    "basket/getBasket",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetchRequest(`/basket`);
            return response.data.items;
        } catch (error) {
            new Error(error);
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
);

export const incrementAmount = createAsyncThunk(
    "basket/incrementAmount",
    async ({ id, amount }, { dispatch,rejectWithValue }) => {
        try {
            await fetchRequest(`/basketItem/${id}/update`, {
                method: "PUT",
                body: { amount: amount + 1 }
            });
            return id;
        } catch (error) {
            new Error(error);
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
);
export const decrementAmount = createAsyncThunk(
    "basket/decrementAmount",
    async ({ id, amount }, { dispatch, rejectWithValue }) => {
        try {
            await fetchRequest(`/basketItem/${id}/update`, {
                method: "PUT",
                body: { amount: amount - 1 }
            });
            if (amount <= 1) {
                await fetchRequest(`/basketItem/${id}/delete`, { method: "DELETE" });
                await dispatch(getBasket());
            }
            return id;
        } catch (error) {
            new Error(error);
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
);