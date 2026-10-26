import Link from "next/link";

const Breadcrumb = ({ items }) => {
  const lastItemIndex = items.length - 1;

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500">
      {items.map((item, index) => {
        return (
          <div key={item.label} className="flex items-center gap-2">
            {index === lastItemIndex ? (
              <span aria-current="page" className="font-medium text-[#262626]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.path}
                className="transition-colors hover:text-gray-900"
              >
                {item.label}
              </Link>
            )}

            {index < lastItemIndex && <span aria-hidden="true">/</span>}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;