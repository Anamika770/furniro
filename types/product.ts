export type ProductColor = {
  name: string;
  value: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  detailDescription?: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  isNew: boolean;
  image: string;
  galleryImages?: string[];
  detailImages?: string[];
  sku?: string;
  category?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  sizes?: string[];
  colors?: ProductColor[];
};
