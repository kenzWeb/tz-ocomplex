import {Product} from '@/types'
import {ProductCard} from '../ProductCard'

interface ProductGridProps {
	products: Product[]
	getItemQuantity: (id: number) => number
	onAddToCart: (productId: number, quantity?: number) => void
	onUpdateQuantity: (productId: number, quantity: number) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({
	products,
	getItemQuantity,
	onAddToCart,
	onUpdateQuantity,
}) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					quantity={getItemQuantity(product.id)}
					onAddToCart={(qty) => onAddToCart(product.id, qty)}
					onUpdateQuantity={(qty) => onUpdateQuantity(product.id, qty)}
				/>
			))}
		</div>
	)
}
