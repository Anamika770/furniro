import Arrival from "@/components/home/ArrivalSection";
import Category from "@/components/home/CategorySection";
import ProductGrid from "@/components/product/ProductGrid";
import Inspiration from "@/components/home/RoomInspiration";
import Gallery from "@/components/home/HomeGallery";
import BenefitsBar from "@/components/common/BenefitsBar";

export default function Home() {
  return (
    <>
      <Arrival />
      <Category />
      <ProductGrid />
      <Inspiration />
      <Gallery />
      <BenefitsBar />
    </>
  );
}
