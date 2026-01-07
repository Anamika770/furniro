import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import authFormReducer from './slices/users/authFormSlice'

// Store Variable
export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            authForm: authFormReducer
        },
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];