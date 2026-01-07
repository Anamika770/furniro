
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function AddToCartButton() {
  const items = useAppSelector(state => state.cart.items)
  return (
    <div  id="cart-icon" className="relative transition-all duration-300 hover:scale-125">
      <Link href="/cart">
        <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-black inline-block" />
      </Link>
      <span className="absolute -top-4 -right-3 h-6 w-6 flex  items-center justify-center rounded-full bg-[#B88E2F]  text-white">
        {items.length}
      </span>
    </div>
  );
}
