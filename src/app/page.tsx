import { ProductType } from "@/types/productType";

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
      <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-56 object-cover object-center"/>
        <div className="p-4">
          <h3 className="text-gray-800 font-semibold text-lg">{product.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-gray-700 font-bold">R$ {product.price}</h1>
            <button className="px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded">Comprar</button>
          </div>
        </div>
      </div>
    ))}

    </div>

   </div>
  );
}
