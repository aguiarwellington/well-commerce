import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/productType";

type CartProduct = ProductType & { quantity: number };

type CartState = {
  cart: CartProduct[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
  cartCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [], 
      isOpen: false,

      // 🔹 Adiciona um item ou aumenta a quantidade se já existir
      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((item) => item.id === product.id);

          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }

          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        });
      },

      // 🔹 Remove UM item do carrinho (se a quantidade for 1, remove completamente)
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0), 
        }));
      },

      // 🔹 Remove COMPLETAMENTE um produto do carrinho
      deleteFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      // 🔹 Limpa completamente o carrinho
      clearCart: () => {
        set(() => ({ cart: [] }));
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      cartCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
