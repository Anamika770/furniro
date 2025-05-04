import ProductView from "./components/productView";
import img1 from "./utils/image_5.png"
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
                url: img1.src,
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
