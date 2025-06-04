import {api} from '@/lib/api'
import {ERROR_MESSAGES} from '@/lib/constants'
import {Product} from '@/types'
import {useCallback, useState} from 'react'

export const useProducts = (pageSize: number = 20) => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [loadingMore, setLoadingMore] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const fetchProducts = useCallback(
		async (page: number, append: boolean = false) => {
			try {
				if (page === 1) {
					setLoading(true)
				} else {
					setLoadingMore(true)
				}
				setError(null)

				const data = await api.products.getAll(page, pageSize)

				if (append) {
					setProducts((prev) => [...prev, ...data.items])
				} else {
					setProducts(data.items)
				}

				setHasMore(data.items.length === pageSize)
				setCurrentPage(page)
			} catch (err) {
				setError(ERROR_MESSAGES.PRODUCTS_LOAD_ERROR)
				console.error('Ошибка загрузки продуктов:', err)
			} finally {
				setLoading(false)
				setLoadingMore(false)
			}
		},
		[pageSize],
	)

	const loadMore = useCallback(() => {
		if (!loadingMore && hasMore) {
			fetchProducts(currentPage + 1, true)
		}
	}, [currentPage, hasMore, loadingMore, fetchProducts])

	return {
		products,
		loading,
		loadingMore,
		error,
		hasMore,
		fetchProducts,
		loadMore,
	}
}
