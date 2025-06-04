'use client'

import {useReviews} from '@/hooks/useReviews'
import {REVIEW_LIMITS} from '@/lib/constants'
import {ErrorState} from './ui/ErrorState'
import {LoadingState} from './ui/LoadingState'
import {ReviewCard} from './ui/ReviewCard'

export const ReviewsSection: React.FC = () => {
	const {reviews, loading, error} = useReviews()

	if (loading) {
		return <LoadingState title='Отзывы' />
	}

	if (error) {
		return <ErrorState title='Отзывы' message={error} />
	}

	const displayReviews = reviews.slice(0, REVIEW_LIMITS.DISPLAY_COUNT)

	return (
		<section className='py-16 bg-[#292727]'>
			<div className='container mx-auto px-4'>
				<h2 className='text-4xl font-bold text-white text-center mb-12'>
					Отзывы
				</h2>

				{displayReviews.length > 0 ? (
					<div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
						{displayReviews.map((review, index) => (
							<ReviewCard
								key={review.id}
								review={review}
								isHighlighted={index === REVIEW_LIMITS.HIGHLIGHT_INDEX}
							/>
						))}
					</div>
				) : (
					<div className='text-center text-gray-400'>
						Отзывы пока не загружены
					</div>
				)}
			</div>
		</section>
	)
}
