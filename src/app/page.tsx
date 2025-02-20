import { ProductType } from "@/types/productType";
import Product from "./components/product";

//funcao para pegar os produtos de uma API
async function getProducts () {
  const response = await fetch('https://fakestoreapi.com/products');
  
  if (!response.ok) {
    throw new Error('Erro ao buscar os produtos');
  }
  
 return response.json();
}

export default  async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
   <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
    <div className="grid grid-cols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">

    
    {products.map((product:ProductType) => (
      <Product key={product.id} product={product} />
    ))}

    </div>

   </div>
  );
}
