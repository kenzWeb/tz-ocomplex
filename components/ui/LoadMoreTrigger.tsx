import {forwardRef} from 'react'
import {Loader} from './Loader'

interface LoadMoreTriggerProps {
	isLoading: boolean
	hasMore: boolean
}

export const LoadMoreTrigger = forwardRef<HTMLDivElement, LoadMoreTriggerProps>(
	({isLoading, hasMore}, ref) => {
		if (!hasMore) return null

		return (
			<div ref={ref} className='flex justify-center py-8'>
				{isLoading && <Loader />}
			</div>
		)
	},
)

LoadMoreTrigger.displayName = 'LoadMoreTrigger'
