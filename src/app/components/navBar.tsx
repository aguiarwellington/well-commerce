import Link from "next/link"; // Importando o Link do Next.js

function navBar() {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
          <Link href="/" className="uppercase font-bold text-md h-12 flex items-center">
            Well store
          </Link>
        </nav>
  );
}

export default navBar; // Exportando o componente navBar