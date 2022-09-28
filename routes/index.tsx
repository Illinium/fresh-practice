import { Handlers, PageProps } from "$fresh/server.ts";
import Navigation from '../components/Navigation.tsx'
import { IProduct } from "../utils/types.ts";
import ProductCard from "../islands/ProductCard.tsx";


export const handler: Handlers<IProduct[] | null> = {
  async GET(_, ctx) {
    const resp = await fetch('https://fakestoreapi.com/products');
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const products= await resp.json() as IProduct[];
    return ctx.render(products);
  },
};

export default function Home({ data: products }: PageProps<IProduct[] | null>) {
  if (!products) {
    return <h1>Products not found</h1>;
  }
  return (
    <>
      <div>
        <Navigation />
      </div>
      <div class="p-4 max-w-screen-md mx-auto grid grid-cols-3 gap-5 mt-20">
        {products && products.map(product => <ProductCard product={product} key={product.id} />)}
      </div>
    </>
  );
}
