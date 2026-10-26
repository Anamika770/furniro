import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/cart';
import type { Product, ProductColor } from '@/types/product';

export type CartState = {
  items: CartItem[];
};

type CartItemIdentity = Pick<CartItem, 'id' | 'selectedSize' | 'selectedColor'>;

const initialState: CartState = {
  items: [],
};

const getCartProduct = (product: Product): CartItem => ({
  ...product,
  quantity: 1,
});

const matchesVariant = (
  item: CartItem,
  productId: number,
  size?: string,
  color?: ProductColor,
) =>
  item.id === productId &&
  item.selectedSize === size &&
  item.selectedColor?.value === color?.value;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) =>
        matchesVariant(item, action.payload.id),
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push(getCartProduct(action.payload));
    },
    addWithQuantity: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        selectedSize?: string;
        selectedColor?: ProductColor;
      }>,
    ) => {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const existingItem = state.items.find((item) =>
        matchesVariant(item, product.id, selectedSize, selectedColor),
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        return;
      }

      state.items.push({ ...product, quantity, selectedSize, selectedColor });
    },
    remove: (state, action: PayloadAction<CartItemIdentity>) => {
      const { id, selectedSize, selectedColor } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !matchesVariant(item, id, selectedSize, selectedColor),
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<CartItemIdentity & { quantity: number }>,
    ) => {
      const { id, selectedSize, selectedColor, quantity } = action.payload;
      const item = state.items.find((cartItem) =>
        matchesVariant(cartItem, id, selectedSize, selectedColor),
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) =>
            !matchesVariant(cartItem, id, selectedSize, selectedColor),
        );
        return;
      }

      item.quantity = quantity;
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { add, addWithQuantity, remove, updateQuantity, clear } = cartSlice.actions;

export default cartSlice.reducer;