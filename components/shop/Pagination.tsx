type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Product pages"
      className="mx-auto flex max-w-[1240px] items-center justify-center gap-3 px-4 pb-12 pt-2 sm:gap-5"
    >
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
          className={`h-10 min-w-10 rounded-md px-4 text-sm transition-colors ${
            page === currentPage
              ? 'bg-[#B88E2F] text-white'
              : 'bg-[#F9F1E7] text-[#262626] hover:bg-[#B88E2F] hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="min-h-10 rounded-md bg-[#F9F1E7] px-5 text-sm text-[#262626] transition-colors hover:bg-[#B88E2F] hover:text-white"
        >
          Next
        </button>
      )}
    </nav>
  );
}
