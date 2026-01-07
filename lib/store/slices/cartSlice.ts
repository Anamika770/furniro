import { createSlice } from '@reduxjs/toolkit'

export type CartItem = {
  [key: string]: any
}

const initialState = {
  items: [] as CartItem[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
        state.items.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { add } = cartSlice.actions

export default cartSlice.reducer