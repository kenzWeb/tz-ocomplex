'use client'

import {useCart} from '@/contexts/CartContext'
import {useProducts} from '@/hooks/useProducts'
import {useToast} from '@/hooks/useToast'
import {useEffect} from 'react'
import {useInView} from 'react-intersection-observer'
import {ErrorState} from './ui/ErrorState'
import {LoadingState} from './ui/LoadingState'
import {LoadMoreTrigger} from './ui/LoadMoreTrigger'
import {ProductGrid} from './ui/ProductGrid'

const PAGE_SIZE = 20

export const ProductsSection: React.FC = () => {
	const {
		products,
		loading,
		loadingMore,
		error,
		hasMore,
		loadMore,
		fetchProducts,
	} = useProducts(PAGE_SIZE)
	const {addToCart, updateQuantity, getItemQuantity, isInitialized} = useCart()
	const {showToast} = useToast()

	const {ref: loadMoreRef, inView} = useInView({
		threshold: 0.1,
		triggerOnce: false,
	})

	const handleAddToCart = (productId: number, quantity?: number) => {
		addToCart(productId, quantity)
		showToast('Товар добавлен в корзину!', 'success')
	}

	useEffect(() => {
		fetchProducts(1)
	}, [fetchProducts])

	useEffect(() => {
		if (inView && hasMore && !loadingMore) {
			loadMore()
		}
	}, [inView, hasMore, loadingMore, loadMore])

	if (loading || !isInitialized) {
		return <LoadingState title='Каталог товаров' />
	}

	if (error) {
		return <ErrorState title='Каталог товаров' message={error} />
	}

	return (
		<section className='py-16 bg-[#292727]' id='products'>
			<div className='container mx-auto px-4'>
				<h2 className='text-4xl font-bold text-white text-center mb-12'>
					Каталог товаров
				</h2>

				{products.length > 0 ? (
					<>
						<ProductGrid
							products={products}
							getItemQuantity={getItemQuantity}
							onAddToCart={handleAddToCart}
							onUpdateQuantity={updateQuantity}
						/>

						<LoadMoreTrigger
							ref={loadMoreRef}
							isLoading={loadingMore}
							hasMore={hasMore}
						/>
					</>
				) : (
					<div className='text-center text-gray-400'>Товары не найдены</div>
				)}
			</div>
		</section>
	)
}
