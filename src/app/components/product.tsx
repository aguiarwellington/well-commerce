'use client';

import { ProductType } from "@/types/productType";
import ProductImage from "./productImage";
import { formatPrice } from "@/lib/utils";
import AddCart from "./AddCart";
import Link from "next/link";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  return (
    <div className="flex flex-col shadow-lg h-100 bg-slate-800 p-5 text-gray-300">
      {/* ✅ Somente essa parte é clicável e leva para a página do produto */}
      <Link href={`/product/${product.id}`} className="flex-1">
  <div className="relative w-full h-80">
    <ProductImage product={product} fill />
  </div>
  <div className="flex justify-between font-bold my-3">
    <p className="w-40 truncate">{product.name}</p>
    <p className="text-md text-teal-300">{formatPrice(product.price)}</p>
  </div>
</Link>

      {/* ✅ Fora do Link: não redireciona, apenas adiciona no carrinho */}
      <AddCart product={product} />
    </div>
  );
}
