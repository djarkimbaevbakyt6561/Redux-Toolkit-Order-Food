import { fetchRequest } from "../lib/fetchAPI"
import { getBasket } from "./basket"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const initialState = {
    meals: [],
    isLoading: false,
    isError: false,
    errorMessage: ""

}
export const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        closeError: (state, action) => {
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMeals.fulfilled, (state, action) => {
            state.meals = action.payload
            state.isLoading = true
        });
        builder.addCase(getMeals.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = true
            state.errorMessage = action.payload
        })
        builder.addCase(addItem.rejected, (state, action) => {
            state.isError = true
            state.errorMessage = action.payload
        })
    }
})
export const mealsReducer = mealsSlice.reducer;
export const mealsActions = mealsSlice.actions;
export const getMeals = createAsyncThunk("meals/getMeals", async (payload, { dispatch, rejectWithValue }) => {
    try {
        const response = await fetchRequest('/foods');
        if (response.data) {
            return response.data
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        new Error(error);
        console.log(error);
        return rejectWithValue(error.message)
    }
})
export const addItem = createAsyncThunk("meals/addItem", async ({ id, amount }, { dispatch, rejectWithValue }) => {
    try {
        await fetchRequest(`/foods/${id}/addToBasket`, { method: 'POST', body: { amount } });
        dispatch(getBasket());
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});