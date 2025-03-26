'use client';

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type CheckoutButtonProps = {
  totalPrice: number;
};

export default function CheckoutButton({ totalPrice }: CheckoutButtonProps) {
  const cartStore = useCartStore();
  const { user } = useUser();
  const router = useRouter();

  const handleCheckout = () => {
    console.log("Botão clicado");
    
    if (!user) {
      cartStore.toggleCart();
      router.push(`/sign-in? redirectUrl='/'`);
      return;
    }
    cartStore.setCheckout("checkout");
  };

  return (
    <div>
      <p className="text-teal-600 font-bold">Total: {formatPrice(totalPrice)}</p>

      <button
        onClick={handleCheckout}
        className="w-full rounded-md bg-teal-600 hover:bg-teal-700 text-white py-2 mt-2"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
