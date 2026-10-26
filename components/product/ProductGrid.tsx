'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Share2, BarChart2, Heart } from 'lucide-react';
import { add } from '@/lib/store/slices/cartSlice';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { getProducts } from '@/lib/services/productService';
import type { Product } from '@/types/product';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US').format(price);

type ProductGridProps = {
  products?: Product[];
  heading?: string;
  showMore?: boolean;
};

export default function ProductGrid({
  products: productList,
  heading = 'Our Products',
  showMore = true,
}: ProductGridProps) {
  const dispatch = useAppDispatch();
  const products = productList ?? getProducts();

  const handleAddToCart = (product: Product) => {
    dispatch(add(product));

    const cartElement = document.getElementById('cart-icon');
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-12">
      {heading && (
        <h2 className="mb-10 text-center text-3xl font-bold">{heading}</h2>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => (
          <article key={item.id} className="group relative flex w-full flex-col bg-white">
            <div className="relative aspect-square w-full overflow-hidden bg-[#F4F5F7]">
              <Link
                href={`/product/${item.id}`}
                aria-label={`View ${item.name} details`}
                className="absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              {item.discount ? (
                <span className="absolute top-4 right-4 bg-red-400 text-white rounded-full px-2 py-1 text-xs font-medium">
                  -{item.discount}%
                </span>
              ) : item.isNew ? (
                <span className="absolute top-4 right-4 bg-teal-400 text-white rounded-full px-2 py-1 text-xs font-medium">
                  New
                </span>
              ) : null}

              <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center space-y-5 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#ffffff] text-[#B88E2F] cursor-pointer py-2 px-4 text-sm font-bold"
                >
                  Add to cart
                </button>
                <div className="flex items-center text-white cursor-pointer font-bold gap-2 mb-3">
                  <Share2 size={16} className="mr-1" /> Share
                  <BarChart2 size={16} className="mr-1" /> Compare
                  <Heart size={16} className="mr-1" /> Like
                </div>
              </div>
            </div>

            <div className="bg-[#F4F5F7] p-4">
            <h3 className="font-medium text-lg text-gray-800">
              <Link href={`/product/${item.id}`} className="hover:text-[#B88E2F]">
                {item.name}
              </Link>
            </h3>
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>

              <div className="flex items-center justify-between space-x-2">
                <span className="font-medium">Rp {formatPrice(item.price)}</span>
                {item.originalPrice && (
                  <span className="text-gray-400 text-sm line-through">
                    Rp {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {showMore && (
        <div className="mt-10 flex justify-center">
          <button className="rounded-lg border-2 border-[#b88e2f] px-8 py-2 font-bold text-[#b88e2f] transition-all duration-300 hover:scale-105 hover:bg-[#b88e2f] hover:text-white">
            Show More
          </button>
        </div>
      )}
    </section>
  );
}