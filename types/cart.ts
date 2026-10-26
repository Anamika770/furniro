import type { Product, ProductColor } from './product';

export type CartItem = Product & {
  quantity: number;
  selectedSize?: string;
  selectedColor?: ProductColor;
};
