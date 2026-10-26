'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

export type ProductSort = 'default' | 'price-asc' | 'price-desc';

const isProductSort = (value: string): value is ProductSort =>
  value === 'default' || value === 'price-asc' || value === 'price-desc';

type ProductToolbarProps = {
  resultStart: number;
  resultEnd: number;
  total: number;
  showNewOnly: boolean;
  showSaleOnly: boolean;
  sortBy: ProductSort;
  onShowNewOnlyChange: (value: boolean) => void;
  onShowSaleOnlyChange: (value: boolean) => void;
  onSortChange: (value: ProductSort) => void;
};

export default function ProductToolbar({
  resultStart,
  resultEnd,
  total,
  showNewOnly,
  showSaleOnly,
  sortBy,
  onShowNewOnlyChange,
  onShowSaleOnlyChange,
  onSortChange,
}: ProductToolbarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <section className="bg-[#F9F1E7]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-4 py-5 md:min-h-[100px] md:py-0">
        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="shop-filters"
            onClick={() => setFiltersOpen((isOpen) => !isOpen)}
            className="inline-flex items-center gap-3 text-base text-[#262626] hover:text-[#B88E2F]"
          >
            <SlidersHorizontal size={20} aria-hidden="true" />
            Filter
          </button>

          <span className="hidden h-8 w-px bg-[#9F9F9F] sm:block" />

          <p className="text-sm text-[#333333]">
            Showing {resultStart}-{resultEnd} of {total} results
          </p>
        </div>

        <label className="flex items-center gap-3 text-base text-[#262626]">
          Sort by
          <select
            value={sortBy}
            onChange={(event) => {
              if (isProductSort(event.target.value)) {
                onSortChange(event.target.value);
              }
            }}
            className="min-w-36 border-0 bg-white px-4 py-3 text-sm text-[#333333] outline-none focus:ring-2 focus:ring-[#B88E2F]"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      {filtersOpen && (
        <div
          id="shop-filters"
          className="border-t border-[#E7DDCF] bg-white"
        >
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-x-10 gap-y-4 px-4 py-5">
            <label className="flex items-center gap-3 text-sm text-[#333333]">
              <input
                type="checkbox"
                checked={showNewOnly}
                onChange={(event) => onShowNewOnlyChange(event.target.checked)}
                className="accent-[#B88E2F]"
              />
              New arrivals
            </label>
            <label className="flex items-center gap-3 text-sm text-[#333333]">
              <input
                type="checkbox"
                checked={showSaleOnly}
                onChange={(event) => onShowSaleOnlyChange(event.target.checked)}
                className="accent-[#B88E2F]"
              />
              On sale
            </label>
          </div>
        </div>
      )}
    </section>
  );
}
