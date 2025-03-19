import { useCartStore } from "@/store";
import { X, Trash } from "lucide-react";

import Image from "next/image";

export default function CartDrawer() {
  const cartStore = useCartStore();
  
  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-50 flex justify-end transition-opacity ${cartStore.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={cartStore.toggleCart} // Fecha ao clicar fora
    >
      <div 
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do carrinho feche
        className={`w-96 h-full bg-slate-900 shadow-lg transform ${cartStore.isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out p-6`}
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">Meu Carrinho</h2>
          <button onClick={cartStore.toggleCart} className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        {cartStore.cart.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <div className="flex flex-col gap-6 mt-6 overflow-y-auto max-h-[65vh]">
            {cartStore.cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                  priority
                />
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-slate-50">{item.currency} {(item.price ?? 0).toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => cartStore.removeFromCart(item.id)}
                      className="bg-red-500 px-2 py-1 rounded text-white text-sm"
                    >
                      -
                    </button>
                    <span className="text-slate-50 font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => cartStore.addToCart(item)}
                      className="bg-green-500 px-2 py-1 rounded text-white text-sm"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => cartStore.deleteFromCart(item.id)}
                      className="bg-gray-500 px-2 py-1 rounded text-white text-sm"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t flex flex-col gap-4">
          <button onClick={cartStore.clearCart} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition">
            Limpar Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
