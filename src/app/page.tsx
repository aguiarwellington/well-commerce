import { ProductType } from "@/types/productType";
import Product from "./components/product";
import Stripe from "stripe";

//funcao para pegar os produtos de uma API
async function getProducts (): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  const products = await stripe.products.list();

  const formatedProducts = await Promise.all(
    products.data.map(async (product) => {
        const price = await stripe.prices.list({
          product: product.id,
          
        });
        return {
          id: product.id,
          price: price.data[0].unit_amount,
          image:product.images[0],
          name: product.name,
          description: product.description,
          currency: price.data[0].currency,
        }
      })
  );
  return formatedProducts;




  //const response = await fetch('https://fakestoreapi.com/products');
  
  //if (!response.ok) {
    //throw new Error('Erro ao buscar os produtos');
  //}
  
 //return response.json();
}

export default  async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
   <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
    <div className="grid grid-cols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">

    
    {products.map((product) => (
      <Product key={product.id} product={product} />
    ))}

    </div>

   </div>
  );
}
