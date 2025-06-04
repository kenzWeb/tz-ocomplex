import {api} from '@/lib/api'
import {ERROR_MESSAGES} from '@/lib/constants'
import {Review} from '@/types'
import {useEffect, useState} from 'react'

export const useReviews = () => {
	const [reviews, setReviews] = useState<Review[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true)
				setError(null)
				const data = await api.reviews.getAll()
				setReviews(data)
			} catch (err) {
				setError(ERROR_MESSAGES.REVIEWS_LOAD_ERROR)
				console.error('Ошибка загрузки отзывов:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchReviews()
	}, [])

	return {reviews, loading, error}
}
