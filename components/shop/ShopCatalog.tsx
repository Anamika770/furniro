'use client';

import { useMemo, useState } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { getProducts } from '@/lib/services/productService';
import type { Product } from '@/types/product';
import Pagination from './Pagination';
import ProductToolbar, { type ProductSort } from './ProductToolbar';

const PRODUCTS_PER_PAGE = 6;

export default function ShopCatalog() {
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<ProductSort>('default');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const matchingProducts = getProducts().filter((product) => {
      if (showNewOnly && !product.isNew) return false;
      if (showSaleOnly && !product.discount) return false;
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...matchingProducts].sort((first, second) => first.price - second.price);
    }

    if (sortBy === 'price-desc') {
      return [...matchingProducts].sort((first, second) => second.price - first.price);
    }

    return matchingProducts;
  }, [showNewOnly, showSaleOnly, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageProducts: Product[] = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );
  const resultStart = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const resultEnd = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);

  const changePage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const changeShowNewOnly = (value: boolean) => {
    setShowNewOnly(value);
    setCurrentPage(1);
  };

  const changeShowSaleOnly = (value: boolean) => {
    setShowSaleOnly(value);
    setCurrentPage(1);
  };

  const changeSort = (value: ProductSort) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <>
      <ProductToolbar
        resultStart={resultStart}
        resultEnd={resultEnd}
        total={filteredProducts.length}
        showNewOnly={showNewOnly}
        showSaleOnly={showSaleOnly}
        sortBy={sortBy}
        onShowNewOnlyChange={changeShowNewOnly}
        onShowSaleOnlyChange={changeShowSaleOnly}
        onSortChange={changeSort}
      />

      {pageProducts.length > 0 ? (
        <ProductGrid products={pageProducts} heading="" showMore={false} />
      ) : (
        <div className="mx-auto max-w-[1240px] px-4 py-20 text-center">
          <h2 className="text-xl font-semibold text-[#262626]">
            No products match these filters
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">
            Try changing or clearing your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setShowNewOnly(false);
              setShowSaleOnly(false);
              setCurrentPage(1);
            }}
            className="mt-5 rounded-md bg-[#B88E2F] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9A7524]"
          >
            Clear filters
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      )}
    </>
  );
}
