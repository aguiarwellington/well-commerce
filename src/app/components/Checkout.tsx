// Checkout.tsx
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function Checkout() {
  const cartStore = useCartStore();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    });
  }, [cartStore.cart, cartStore.paymentIntent]);

  return (
    <div className="text-white flex flex-col gap-4">
      <button
        onClick={() => cartStore.setCheckout("cart")}
        className="text-sm text-teal-400 hover:underline self-start"
      >
        ← Voltar para o carrinho
      </button>
      <h1 className="text-xl font-semibold">Checkout</h1>
    </div>
  );
}
