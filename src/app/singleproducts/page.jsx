import ProductView from "./components/productView";

// Generate Meta Tags
export const metadata = {
    title: "Single Product",
    description: "Single Product Page",
    keywords: "single product, product page, product details",
    openGraph: {
        title: "Single Product",
        description: "Single Product Page",
        url: "/singleproducts",
        siteName: "Single Product",
        images: [
            {
                url: "/images/og-image.png",
                width: 800,
                height: 600,
            },
        ],
    },
};

export default function Page() {
    return (
        <>
            <ProductView />
        </>
    )
};
