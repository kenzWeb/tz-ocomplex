import {sanitizeHtml} from '@/lib/utils'
import {Review} from '@/types'

interface ReviewCardProps {
	review: Review
	isHighlighted?: boolean
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
	review,
	isHighlighted = false,
}) => {
	return (
		<div
			className={`p-8 rounded-lg ${
				isHighlighted ? 'bg-white text-black' : 'bg-[#D9D9D9] text-black'
			}`}
		>
			<div className='mb-6'>
				<h3 className='text-xl font-semibold mb-2'>{review.name}</h3>
			</div>
			<div
				className='text-gray-700 leading-relaxed'
				dangerouslySetInnerHTML={{
					__html: sanitizeHtml(review.text),
				}}
			/>
		</div>
	)
}
