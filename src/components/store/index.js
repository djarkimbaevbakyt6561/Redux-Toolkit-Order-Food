import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { basketReducer } from "./basket";
import { mealsReducer } from "./meals";

const rootReducer = combineReducers({
    basket: basketReducer,
    meals: mealsReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))