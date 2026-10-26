import TopBar from "@/components/common/TopBar";
import BenefitsBar from "@/components/common/BenefitsBar";
import ShopCatalog from "@/components/shop/ShopCatalog";

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <TopBar img="/images/group-78.png" />
      <ShopCatalog />
      <BenefitsBar />
    </main>
  );
}
