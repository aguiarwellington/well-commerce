'use client';

import { useCartStore } from "@/store";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";

export default function Cart() {
  const cartStore = useCartStore();
  const cartCount = cartStore.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative flex items-center cursor-pointer">
      <button onClick={cartStore.toggleCart} className="relative bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition flex items-center gap-2">
        <ShoppingCart size={24} />
        <span>Carrinho</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      {cartStore.isOpen && <CartDrawer />}
    </div>
  );
}