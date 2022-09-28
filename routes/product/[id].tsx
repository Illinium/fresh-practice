import { Handlers, PageProps } from "$fresh/server.ts";
import { IProduct } from "../../utils/types.ts";
import Navigation from "../../components/Navigation.tsx"


export const handler: Handlers<IProduct[] | null> = {
  async GET(_, ctx) {
    const resp = await fetch(`https://fakestoreapi.com/products/${ctx.params.id}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const product = await resp.json() as IProduct;
    return ctx.render(product);
  },
};

export default function Product({ data: product }: PageProps<IProduct | null>) {
    if (!product) {
      return <h1>Product not found</h1>;
    }
    return (
      <>
      <Navigation />
            <div class="flex justify-center mt-20">
                <a href="/">Back</a>
                <img src={product.image} alt={product.title} class="w-1/4" />
            </div>
      </>
    );
  }