// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/productType";

type CartProduct = ProductType & { quantity: number };

type CartState = {
  cart: CartProduct[];
  isOpen: boolean;
  checkoutState: "cart" | "checkout";
  paymentIntent: string;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  cartCount: () => number;
  setCheckout: (state: "cart" | "checkout") => void;
  setPaymentIntent: (paymentIntent: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,
      checkoutState: "cart",
      paymentIntent: "",

      addToCart: (product) => {
        const { cart } = get();
        const exists = cart.find((item) => item.id === product.id);
        if (exists) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        set({
          cart: cart
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      deleteFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      clearCart: () => set({ cart: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      cartCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),

      setCheckout: (state) => set({ checkoutState: state }),

      setPaymentIntent: (paymentIntent) => set({ paymentIntent }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cart: state.cart,
        checkoutState: state.checkoutState,
        paymentIntent: state.paymentIntent,
      }),
    }
  )
);
