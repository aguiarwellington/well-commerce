
import Product from "./components/product";
import { fetchProducts } from "./actions";
import InfiniteScroll from "./components/InfiniteScroll";

export default  async function Home() {
  const {formatedProducts} = await fetchProducts({});

  
  return (
   <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
    <div className="grid grid-cols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">

    {formatedProducts.map((product) => (
      <Product key={product.id} product={product} />
    ))}

    <InfiniteScroll initialProducts={formatedProducts} />

    </div>

   </div>
  );
}
