'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import BenefitsBar from '@/components/common/BenefitsBar';
import TopBar from '@/components/common/TopBar';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import {
  remove,
  updateQuantity,
} from '@/lib/store/slices/cartSlice';
import type { CartItem } from '@/types/cart';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US').format(price);

const getItemIdentity = (item: CartItem) => ({
  id: item.id,
  selectedSize: item.selectedSize,
  selectedColor: item.selectedColor,
});

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen">
      <TopBar img="/images/group-78.png" title="Cart" />

      {items.length === 0 ? (
        <section className="mx-auto flex max-w-[1240px] flex-col items-center px-4 py-20 text-center">
          <h2 className="text-2xl font-medium text-[#262626]">
            Your cart is empty
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#6B6B6B]">
            Find something you love and it will show up here.
          </p>
          <Link
            href="/shop"
            className="mt-7 rounded-md border border-[#262626] px-8 py-3 text-sm transition-colors hover:border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
          >
            Continue shopping
          </Link>
        </section>
      ) : (
        <section className="mx-auto grid max-w-[1240px] gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-8">
          <div className="min-w-0">
            <div className="hidden grid-cols-[minmax(0,1fr)_120px_132px_120px_40px] items-center gap-4 bg-[#F9F1E7] px-6 py-4 text-sm font-medium text-[#262626] md:grid">
              <span>Product</span>
              <span>Price</span>
              <span className="text-center">Quantity</span>
              <span>Subtotal</span>
              <span />
            </div>

            <ul className="divide-y divide-[#E8E8E8]">
              {items.map((item) => {
                const identity = getItemIdentity(item);
                const variant = [
                  item.selectedSize ? `Size: ${item.selectedSize}` : null,
                  item.selectedColor?.name
                    ? `Color: ${item.selectedColor.name}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ');

                return (
                  <li
                    key={`${item.id}-${item.selectedSize ?? ''}-${item.selectedColor?.value ?? ''}`}
                    className="relative grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_120px_132px_120px_40px] md:items-center md:gap-4 md:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <Link
                        href={`/product/${item.id}`}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-[#F9F1E7]"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.id}`}
                          className="font-medium text-[#6B6B6B] hover:text-[#B88E2F]"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-[#9F9F9F]">
                          {item.description}
                        </p>
                        {variant && (
                          <p className="mt-1 text-xs text-[#9F9F9F]">{variant}</p>
                        )}
                        <p className="mt-2 text-sm text-[#6B6B6B] md:hidden">
                          Rp {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>

                    <span className="hidden text-sm text-[#6B6B6B] md:block">
                      Rp {formatPrice(item.price)}
                    </span>

                    <div className="flex items-center gap-3 md:justify-center">
                      <span className="text-sm text-[#6B6B6B] md:hidden">
                        Quantity
                      </span>
                      <div className="inline-flex h-9 items-center rounded-md border border-[#9F9F9F]">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                ...identity,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          className="px-2 text-[#262626] hover:text-[#B88E2F] disabled:cursor-not-allowed disabled:text-[#C8C8C8]"
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          aria-label={`Quantity: ${item.quantity}`}
                          className="min-w-6 text-center text-sm"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                ...identity,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="px-2 text-[#262626] hover:text-[#B88E2F]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:block">
                      <span className="text-sm text-[#6B6B6B] md:hidden">
                        Subtotal
                      </span>
                      <span className="text-sm font-medium text-[#B88E2F]">
                        Rp {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => dispatch(remove(identity))}
                      className="absolute right-4 text-[#B88E2F] transition-colors hover:text-red-600 md:static md:justify-self-end"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/shop"
              className="mt-4 inline-flex text-sm text-[#6B6B6B] underline underline-offset-4 transition-colors hover:text-[#B88E2F]"
            >
              Continue shopping
            </Link>
          </div>

          <aside className="h-fit bg-[#F9F1E7] px-6 py-8 sm:px-10">
            <h2 className="text-center text-2xl font-semibold text-[#262626]">
              Cart Totals
            </h2>
            <dl className="mt-8 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm font-medium text-[#262626]">Subtotal</dt>
                <dd className="text-sm text-[#9F9F9F]">
                  Rp {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm font-medium text-[#262626]">Total</dt>
                <dd className="text-lg font-medium text-[#B88E2F]">
                  Rp {formatPrice(subtotal)}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => toast.info('Checkout is not available yet.')}
              className="mx-auto mt-8 block rounded-md border border-[#262626] px-10 py-3 text-sm text-[#262626] transition-colors hover:border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
            >
              Check Out
            </button>
          </aside>
        </section>
      )}

      <BenefitsBar />
    </main>
  );
}
