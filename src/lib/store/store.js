import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slice/cartSlice';
import authFormReducer from "./slice/users/userSlice";

// Store Variable
export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            authForm: authFormReducer
        },
    })
}