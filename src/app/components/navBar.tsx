import Link from "next/link"; // Importando o Link do Next.js
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
// import {useCartStore} from '../../store';
import { ShoppingCart } from "lucide-react"; // Importando ícone de carrinho de compras
//import { useState } from "react";

function NavBar() {
  // Simulação da quantidade de itens no carrinho (substituir por estado real do carrinho)
  const cartCount = 3;

  

  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link href="/" className="uppercase font-bold text-md h-12 flex items-center">
        Well Store
      </Link>
      <div className="flex items-center gap-8">
        {/* Ícone do Carrinho com contador */}
        <div className="relative flex items-center cursor-pointer">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        {/* Área de Autenticação */}
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="border rounded-md border-gray-400 uppercase font-bold text-md px-3 py-2 h-12 flex items-center">
                Fazer login
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default NavBar; // Exportando o componente NavBar
