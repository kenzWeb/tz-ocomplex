import {formatPrice, truncateText} from '@/lib/utils'

interface ProductInfoProps {
	title: string
	description: string
	price: number
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
	title,
	description,
	price,
}) => {
	return (
		<div className='p-4'>
			<h3 className='text-lg font-semibold mb-2 text-black' title={title}>
				{truncateText(title, 30)}
			</h3>

			<p className='text-black text-sm mb-3' title={description}>
				{truncateText(description, 80)}
			</p>

			<div className='mb-4'>
				<span className='text-lg font-bold text-black'>
					цена: {formatPrice(price)}
				</span>
			</div>
		</div>
	)
}
