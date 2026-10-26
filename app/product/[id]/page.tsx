import { notFound } from 'next/navigation';
import ProductDetails from '@/components/product/ProductDetails';
import { getProductById } from '@/lib/services/productService';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId < 1) {
    notFound();
  }

  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetails key={product.id} product={product} />;
}
