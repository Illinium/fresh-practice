import { IProduct } from "../utils/types.ts"
import {useState} from 'preact/hooks'
import {Button} from '../components/Button.tsx'

interface ProductCardProps {
    product: IProduct
}

export default function ProductCard({ product }: ProductCardProps) {
    const [show, setShow] = useState(false);
    const toogle = () => setShow(prev => !prev)
  return (
    <div class="border rounded px-4 py-2 mb-2 flex flex-col justify-center items-center">
        <a href={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} class="w-1/4" />
          <h2 class="font-bold text-lg">{product.title}</h2>
          <p class="font-bold">{product.price}</p>
          {show && <p>{product.description}</p>}
        </a>
        <Button onClick={toogle}>Show more</Button>
    </div>
  )
}
