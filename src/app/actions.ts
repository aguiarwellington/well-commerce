'use server';
import { stripe } from "@/lib/strype";


//funcao para pegar os produtos de uma API
//lastProductId é o id do ultimo produto que foi pego, para pegar os proximos produtos
//se não for passado, pega todos os produtos

export async function fetchProducts ({lastProductId}: {lastProductId?: string | undefined}) {
    const params = lastProductId ? { starting_after: lastProductId , limit : 12 } 
    : {limit: 12};
    const {data: products, has_more} = await stripe.products.list(params);

    const formatedProducts = await Promise.all(
      products.map(async (product) => {
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
    return {formatedProducts, has_more};
  
  }