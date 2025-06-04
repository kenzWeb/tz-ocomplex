'use client'

import {Product} from '@/types'
import {AddToCartButton} from './ui/AddToCartButton'
import {ProductImage} from './ui/ProductImage'
import {ProductInfo} from './ui/ProductInfo'
import {QuantityControls} from './ui/QuantityControls'

interface ProductCardProps {
	product: Product
	quantity: number
	onAddToCart: (quantity?: number) => void
	onUpdateQuantity: (quantity: number) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
	product,
	quantity,
	onAddToCart,
	onUpdateQuantity,
}) => {
	const handleAddToCart = () => onAddToCart(1)

	return (
		<div className='bg-[#D9D9D9] rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
			<ProductImage src={product.image_url} alt={product.title} />

			<ProductInfo
				title={product.title}
				description={product.description}
				price={product.price}
			/>

			<div className='px-4 pb-4'>
				{quantity === 0 ? (
					<AddToCartButton onAdd={handleAddToCart} />
				) : (
					<QuantityControls quantity={quantity} onUpdate={onUpdateQuantity} />
				)}
			</div>
		</div>
	)
}
