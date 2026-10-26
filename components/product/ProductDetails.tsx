'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Check,
  Facebook,
  Heart,
  Minus,
  Plus,
  Share2,
  Star,
  Twitter,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { toast } from 'sonner';
import ProductGrid from '@/components/product/ProductGrid';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { addWithQuantity } from '@/lib/store/slices/cartSlice';
import { getProducts } from '@/lib/services/productService';
import type { Product, ProductColor } from '@/types/product';

type ProductDetailsProps = {
  product: Product;
};

type ProductTab = 'description' | 'information' | 'reviews';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US').format(price);

const tabs: { id: ProductTab; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'information', label: 'Additional Information' },
  { id: 'reviews', label: 'Reviews' },
];

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ProductTab>('description');
  const [activeImage, setActiveImage] = useState(product.image);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0],
  );
  const [isCompared, setIsCompared] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const galleryImages = product.galleryImages?.length
    ? product.galleryImages
    : [product.image];
  const relatedProducts = getProducts()
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  useEffect(() => {
    if (!isZoomOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isZoomOpen]);

  const addProductToCart = () => {
    dispatch(
      addWithQuantity({
        product,
        quantity,
        selectedSize: selectedSize || undefined,
        selectedColor,
      }),
    );
    toast.success(`${product.name} added to cart`);
  };

  const shareProduct = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      toast.error('Unable to share the product link');
    }
  };

  const shareToNetwork = (network: 'facebook' | 'twitter') => {
    const productUrl = encodeURIComponent(window.location.href);
    const shareUrl =
      network === 'facebook'
        ? `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`
        : `https://twitter.com/intent/tweet?url=${productUrl}&text=${encodeURIComponent(product.name)}`;

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <main>
      <div className="bg-[#F9F1E7]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-3 px-4 py-5 text-sm text-[#9F9F9F]"
        >
          <Link href="/" className="transition-colors hover:text-[#B88E2F]">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/shop" className="transition-colors hover:text-[#B88E2F]">
            Shop
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="max-w-full truncate text-[#262626]">
            {product.name}
          </span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-[1240px] gap-8 px-4 py-8 md:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] md:gap-12 md:py-12">
        <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-6">
          <div
            aria-label="Product image gallery"
            className="flex flex-col gap-3"
          >
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`Show product image ${index + 1}`}
                aria-pressed={activeImage === image}
                onClick={() => setActiveImage(image)}
                className={`relative aspect-square overflow-hidden rounded-md bg-[#F9F1E7] ${
                  activeImage === image
                    ? 'ring-2 ring-[#B88E2F] ring-offset-2'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-md bg-[#F9F1E7] sm:min-h-[460px]">
            <button
              type="button"
              onClick={() => {
                setZoomLevel(1);
                setIsZoomOpen(true);
              }}
              aria-label={`Zoom in on ${product.name}`}
              className="absolute inset-0 z-0 cursor-zoom-in"
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 75vw, 42vw"
                className="object-cover"
              />
            </button>
            {product.discount ? (
              <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-[#B88E2F] px-3 py-2 text-sm font-medium text-white">
                -{product.discount}%
              </span>
            ) : product.isNew ? (
              <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-[#2EC1AC] px-3 py-2 text-sm font-medium text-white">
                New
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col py-1 md:py-2">
          <h1 className="text-3xl font-medium text-[#262626] sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="text-xl font-medium text-[#9F9F9F]">
              Rp {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-[#B0B0B0] line-through">
                Rp {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#9F9F9F]">
            <span
              className="flex items-center gap-1"
              aria-label={`Rated ${product.rating ?? 0} out of 5`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={15}
                  fill={index < Math.round(product.rating ?? 0) ? '#FFC700' : 'none'}
                  stroke={index < Math.round(product.rating ?? 0) ? '#FFC700' : '#C8C8C8'}
                />
              ))}
            </span>
            <span className="h-5 w-px bg-[#D9D9D9]" aria-hidden="true" />
            <span>{product.reviewCount ?? 0} Customer Reviews</span>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#555555]">
            {product.description}
          </p>

          <div className="mt-5">
            <p className="mb-2 text-xs text-[#9F9F9F]">Size</p>
            <div className="flex flex-wrap gap-3">
              {(product.sizes ?? []).map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs transition-colors ${
                    selectedSize === size
                      ? 'bg-[#B88E2F] text-white'
                      : 'bg-[#F9F1E7] text-[#262626] hover:bg-[#E9D8BD]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs text-[#9F9F9F]">Color</p>
            <div className="flex flex-wrap gap-3">
              {(product.colors ?? []).map((color) => (
                <button
                  key={color.name}
                  type="button"
                  aria-label={`Select ${color.name}`}
                  aria-pressed={selectedColor?.value === color.value}
                  onClick={() => setSelectedColor(color)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    selectedColor?.value === color.value
                      ? 'ring-2 ring-[#B88E2F] ring-offset-2'
                      : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor?.value === color.value && (
                    <Check size={15} className="text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div
              aria-label={`Quantity: ${quantity}`}
              className="inline-flex h-10 items-center rounded-md border border-[#9F9F9F] px-2"
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="p-2 text-[#262626] hover:text-[#B88E2F] disabled:cursor-not-allowed disabled:text-[#C8C8C8]"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-7 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => current + 1)}
                className="p-2 text-[#262626] hover:text-[#B88E2F]"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={addProductToCart}
              className="h-10 rounded-md border border-[#262626] px-5 text-sm text-[#262626] transition-colors hover:bg-[#B88E2F] hover:text-white"
            >
              Add To Cart
            </button>

            <button
              type="button"
              aria-pressed={isCompared}
              onClick={() => setIsCompared((current) => !current)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-[#262626] px-4 text-sm text-[#262626] transition-colors hover:bg-[#262626] hover:text-white"
            >
              {isCompared ? <Check size={15} /> : <Plus size={15} />}
              {isCompared ? 'Added to Compare' : 'Compare'}
            </button>
          </div>

          <dl className="mt-7 grid gap-2 border-t border-[#D9D9D9] pt-5 text-xs text-[#9F9F9F]">
            <div className="grid grid-cols-[72px_1fr] gap-2">
              <dt>SKU</dt>
              <dd>: {product.sku ?? `FUR-${String(product.id).padStart(3, '0')}`}</dd>
            </div>
            <div className="grid grid-cols-[72px_1fr] gap-2">
              <dt>Category</dt>
              <dd>: {product.category ?? 'Furniture'}</dd>
            </div>
            <div className="grid grid-cols-[72px_1fr] gap-2">
              <dt>Tags</dt>
              <dd>: {(product.tags ?? []).join(', ')}</dd>
            </div>
            <div className="grid grid-cols-[72px_1fr] items-center gap-2">
              <dt>Share</dt>
              <dd className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Share product"
                  onClick={shareProduct}
                  className="text-[#262626] hover:text-[#B88E2F]"
                >
                  <Share2 size={15} />
                </button>
                <button type="button" aria-label="Share on Facebook" onClick={() => shareToNetwork('facebook')} className="text-[#262626] hover:text-[#B88E2F]">
                  <Facebook size={15} />
                </button>
                <button type="button" aria-label="Share on Twitter" onClick={() => shareToNetwork('twitter')} className="text-[#262626] hover:text-[#B88E2F]">
                  <Twitter size={15} />
                </button>
                <button
                  type="button"
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-pressed={isWishlisted}
                  onClick={() => {
                    setIsWishlisted((current) => !current);
                    toast.success(
                      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
                    );
                  }}
                  className="text-[#262626] hover:text-[#B88E2F]"
                >
                  <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-[10px] text-[#A0A0A0]">
            Product rating, variants, and gallery are sample demo data.
          </p>
        </div>
      </section>

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image viewer`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsZoomOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-5xl rounded-lg bg-white p-3 shadow-2xl sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="truncate text-sm font-medium text-[#262626]">
                {product.name}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label="Zoom out"
                  disabled={zoomLevel <= 1}
                  onClick={() => setZoomLevel((level) => Math.max(1, level - 0.5))}
                  className="rounded-md border border-gray-200 p-2 text-[#262626] hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  <ZoomOut size={18} />
                </button>
                <span className="min-w-12 text-center text-xs text-gray-600">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  aria-label="Zoom in"
                  disabled={zoomLevel >= 3}
                  onClick={() => setZoomLevel((level) => Math.min(3, level + 0.5))}
                  className="rounded-md border border-gray-200 p-2 text-[#262626] hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Close image viewer"
                  autoFocus
                  onClick={() => setIsZoomOpen(false)}
                  className="ml-1 rounded-md p-2 text-[#262626] hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-auto rounded-md bg-[#F9F1E7]">
              <div
                className="relative mx-auto aspect-square"
                style={{ width: `${zoomLevel * 100}%` }}
              >
                <Image
                  src={activeImage}
                  alt={`${product.name} enlarged`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="border-y border-[#D9D9D9]">
        <div className="mx-auto max-w-[1240px] px-4 py-10 sm:py-14">
          <div
            role="tablist"
            aria-label="Product information"
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 sm:gap-x-12"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`product-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="product-tab-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`text-base transition-colors sm:text-lg ${
                  activeTab === tab.id
                    ? 'font-medium text-[#262626]'
                    : 'text-[#9F9F9F] hover:text-[#262626]'
                }`}
              >
                {tab.label}
                {tab.id === 'reviews' && ` (${product.reviewCount ?? 0})`}
              </button>
            ))}
          </div>

          <div
            id="product-tab-panel"
            role="tabpanel"
            aria-labelledby={`product-tab-${activeTab}`}
            className="mx-auto mt-7 max-w-5xl text-xs leading-6 text-[#9F9F9F] sm:text-sm sm:leading-7"
          >
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>{product.detailDescription ?? product.description}</p>
                <p>
                  Designed to complement your home, this sample product pairs
                  practical everyday comfort with a clean, considered profile.
                  Style it with your favourite pieces to create a room that feels
                  personal and welcoming.
                </p>
                {product.detailImages && product.detailImages.length > 0 && (
                  <div className="grid gap-5 pt-3 sm:grid-cols-2">
                    {product.detailImages.slice(0, 2).map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative aspect-[1.45] overflow-hidden rounded-md bg-[#F9F1E7]"
                      >
                        <Image
                          src={image}
                          alt={`${product.name} detail view ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'information' && (
              <dl className="grid gap-3 sm:grid-cols-2">
                <div><dt className="inline font-medium text-[#555555]">Name: </dt><dd className="inline">{product.name}</dd></div>
                <div><dt className="inline font-medium text-[#555555]">Category: </dt><dd className="inline">{product.category ?? 'Furniture'}</dd></div>
                <div><dt className="inline font-medium text-[#555555]">SKU: </dt><dd className="inline">{product.sku ?? `FUR-${String(product.id).padStart(3, '0')}`}</dd></div>
                <div><dt className="inline font-medium text-[#555555]">Price: </dt><dd className="inline">Rp {formatPrice(product.price)}</dd></div>
              </dl>
            )}
            {activeTab === 'reviews' && (
              <p>
                {product.reviewCount
                  ? `${product.reviewCount} sample customer reviews.`
                  : 'No customer reviews yet.'}
              </p>
            )}
          </div>
        </div>
      </section>

      <ProductGrid
        products={relatedProducts}
        heading="Related Products"
        showMore
      />
    </main>
  );
}
