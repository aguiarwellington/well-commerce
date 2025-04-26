'use client'


import { ProductType } from "@/types/productType";
import { useState, useEffect, useCallback } from "react";
import Product from "./product";
import { useInView } from "react-intersection-observer";
import { fetchProducts } from "@/app/actions";

function InfiniteScroll({
    initialProducts
}: {
    initialProducts: ProductType[];
}) {

    const [products, setProducts] = useState<ProductType[]>(initialProducts);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    const loadMoreProducts = useCallback(async () => {
        setIsLoading(true);
    
        const lastProductId = products[products.length - 1]?.id;
    
        const { formatedProducts, has_more } = await fetchProducts({
            lastProductId,
        });
    
        setProducts((prev) => [...prev, ...formatedProducts]);
        setHasMore(has_more);
        setIsLoading(false);
    }, [products]);


    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            loadMoreProducts();
        }
    }, [inView, hasMore, isLoading, loadMoreProducts]);

   if (!products)
    return <div>Carregando....</div>     

  return (
    <>
        {products.map((product) => (
            <Product key={product.id} product={product} />
       ))}
       {hasMore && (
            <div ref={ref} className="flex justify-center items-center w-full h-20">
                <div className="loader">Carregando masi registros</div>
            </div>
        )}

      
    </>
  )
 
}
export default InfiniteScroll;

