import Link from "next/link"; // Importando o Link do Next.js
import { SignedIn,SignedOut,SignInButton,UserButton } from '@clerk/nextjs'


function navBar() {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
          <Link href="/" className="uppercase font-bold text-md h-12 flex items-center">
            Well store
          </Link>

          <div className="flex items-center gap-8">
          <SignedIn>
            <UserButton />
          </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal" >
              <button className="border rounded-md border-gray-400 uppercase font-bold text-md px-3 py-2 h-12 flex items-center">
                Fazer login   
              </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
  );
}

export default navBar; // Exportando o componente navBar