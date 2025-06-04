'use client'

import {useState} from 'react'

interface AddToCartButtonProps {
	onAdd: () => void
	disabled?: boolean
	className?: string
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
	onAdd,
	disabled = false,
	className = '',
}) => {
	const [isAdding, setIsAdding] = useState(false)

	const handleClick = () => {
		setIsAdding(true)
		onAdd()

		setTimeout(() => {
			setIsAdding(false)
		}, 200)
	}

	return (
		<button
			onClick={handleClick}
			disabled={disabled || isAdding}
			className={`w-full bg-[#222222] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transform ${
				isAdding ? 'scale-95' : 'scale-100'
			} ${className}`}
		>
			{isAdding ? 'Добавлено!' : 'купить'}
		</button>
	)
}
