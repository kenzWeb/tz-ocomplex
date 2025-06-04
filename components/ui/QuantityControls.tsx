'use client'

import {useState} from 'react'

interface QuantityControlsProps {
	quantity: number
	onUpdate: (quantity: number) => void
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({
	quantity,
	onUpdate,
}) => {
	const [inputValue, setInputValue] = useState(quantity.toString())

	const handleIncrement = () => {
		const newQuantity = quantity + 1
		onUpdate(newQuantity)
		setInputValue(newQuantity.toString())
	}

	const handleDecrement = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1
			onUpdate(newQuantity)
			setInputValue(newQuantity.toString())
		} else {
			onUpdate(0)
			setInputValue('0')
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)

		const numValue = parseInt(value) || 0
		if (numValue >= 0) {
			onUpdate(numValue)
		}
	}

	const handleInputBlur = () => {
		setInputValue(quantity.toString())
	}

	return (
		<div className='flex items-center gap-2'>
			<button onClick={handleDecrement} className='quantity-btn'>
				-
			</button>

			<input
				type='number'
				value={inputValue}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				min='0'
				className='quantity-input'
			/>

			<button onClick={handleIncrement} className='quantity-btn'>
				+
			</button>
		</div>
	)
}
