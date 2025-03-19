'use client';

import { useCartStore } from "@/store";
import { ProductType } from "@/types/productType";

export default function AddCart({ product }: { product: ProductType }) {
  const { addToCart } = useCartStore();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="rounded-md bg-teal-600 text-white p-3.5 py-2.5 text-sm text-center"
    >
      Adicionar ao Carrinho
    </button>
  );
}
