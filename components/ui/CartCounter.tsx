'use client'

import {useEffect, useState} from 'react'

interface CartCounterProps {
	count: number
	className?: string
}

export const CartCounter: React.FC<CartCounterProps> = ({
	count,
	className = '',
}) => {
	const [isUpdating, setIsUpdating] = useState(false)
	const [prevCount, setPrevCount] = useState(count)

	useEffect(() => {
		if (count !== prevCount) {
			setIsUpdating(true)
			setPrevCount(count)

			const timer = setTimeout(() => {
				setIsUpdating(false)
			}, 300)

			return () => clearTimeout(timer)
		}
	}, [count, prevCount])

	return (
		<div className={`mb-6 text-center ${className}`}>
			<p className='text-lg text-black'>
				Товаров в корзине:{' '}
				<span
					className={`font-semibold transition-all duration-300 ${
						isUpdating ? 'text-green-600 scale-110' : 'scale-100'
					}`}
				>
					{count}
				</span>
			</p>
		</div>
	)
}
