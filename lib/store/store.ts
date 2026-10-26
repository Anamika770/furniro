import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authFormReducer from './slices/auth/authFormSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      authForm: authFormReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];