'use client'

import {useEffect} from 'react'

interface ToastProps {
	message: string
	type: 'success' | 'error' | 'info'
	isVisible: boolean
	onClose: () => void
	duration?: number
}

export const Toast: React.FC<ToastProps> = ({
	message,
	type,
	isVisible,
	onClose,
	duration = 3000,
}) => {
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(onClose, duration)
			return () => clearTimeout(timer)
		}
	}, [isVisible, onClose, duration])

	if (!isVisible) return null

	const bgColor = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		info: 'bg-blue-500',
	}[type]

	return (
		<div className='fixed top-4 right-4 z-50 animate-slide-in'>
			<div
				className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg max-w-sm`}
			>
				<div className='flex items-center justify-between'>
					<p className='text-sm font-medium'>{message}</p>
					<button
						onClick={onClose}
						className='ml-4 text-white hover:text-gray-200'
					>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
