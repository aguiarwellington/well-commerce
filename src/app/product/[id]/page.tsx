import Stripe from "stripe";
import ProductImage from "../../components/productImage";
import AddCart from "@/app/components/AddCart";

type ProductPageProps = {
  params: { 
    id: string; 
  };
};

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  const produto = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: produto.id,})
return {
  id: produto.id,
  price: price.data[0].unit_amount,
  name: produto.name,
  image: produto.images[0],
  description : produto.description,
  Currency : price.data[0].currency,
  };
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col md:flex-row items max-w-7xl mx-auto gap-8 p-10 ">
      <ProductImage product = {product} />
      <div className="flex flex-col">
        <div className="pb-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl tex-teal-600 font-bold">{product.price}</p>
        </div>
        <div className="pb-4">
          <p className="text-sm">{product.description}</p>
        </div>
        <AddCart product={product} />
      </div>
    </div>
   
  );
}
