import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slice/cartSlice'

// Store Variable
export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer
        },
    })
}