'use client'

import {useCart} from '@/contexts/CartContext'
import {usePhone} from '@/hooks/usePhone'
import {api} from '@/lib/api'
import {ERROR_MESSAGES, SUCCESS_MESSAGES} from '@/lib/constants'
import {useState} from 'react'
import {CartCounter} from './ui/CartCounter'
import {Modal} from './ui/Modal'
import {PhoneInput} from './ui/PhoneInput'
import {SubmitButton} from './ui/SubmitButton'

const formatPhoneInput = (value: string): string => {
	let cleanValue = value.replace(/\D/g, '')

	if (cleanValue.length > 0 && !cleanValue.startsWith('7')) {
		cleanValue = '7' + cleanValue
	}

	return cleanValue.length > 11 ? cleanValue.slice(0, 11) : cleanValue
}

export const CartSection: React.FC = () => {
	const {getTotalItems, getCartItems, clearCart, isInitialized} = useCart()
	const {phone, updatePhone, isValidPhone, clearPhone} = usePhone()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [showErrorModal, setShowErrorModal] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [phoneError, setPhoneError] = useState(false)

	const totalItems = getTotalItems()

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = formatPhoneInput(e.target.value)
		updatePhone(formattedValue)
		setPhoneError(false)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!isValidPhone()) {
			setPhoneError(true)
			return
		}

		const cartItems = getCartItems()
		if (cartItems.length === 0) {
			setErrorMessage('Корзина пуста')
			setShowErrorModal(true)
			return
		}

		setIsSubmitting(true)

		try {
			const orderData = {
				phone: phone,
				cart: cartItems,
			}

			const response = await api.orders.create(orderData)

			if (response.success === 1) {
				setShowSuccessModal(true)
				clearCart()
				clearPhone()
			} else {
				setErrorMessage(response.error || ERROR_MESSAGES.ORDER_CREATE_ERROR)
				setShowErrorModal(true)
			}
		} catch (error) {
			setErrorMessage(ERROR_MESSAGES.ORDER_CREATE_ERROR)
			setShowErrorModal(true)
			console.error('Order submission error:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleSuccessModalClose = () => {
		setShowSuccessModal(false)
	}

	const handleErrorModalClose = () => {
		setShowErrorModal(false)
		setErrorMessage('')
	}

	if (!isInitialized) {
		return (
			<section className='py-16 bg-[#292727]' id='order'>
				<div className='container mx-auto px-4'>
					<h2 className='text-4xl font-bold text-white text-center mb-12'>
						Оформить заказ
					</h2>
					<div className='max-w-md mx-auto text-center'>
						<div className='bg-[#D9D9D9] p-6 rounded-lg shadow-sm'>
							<p className='text-gray-600'>Загрузка корзины...</p>
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className='py-16 bg-[#292727]' id='order'>
			<div className='container mx-auto px-4'>
				<h2 className='text-4xl font-bold text-white text-center mb-12'>
					Оформить заказ
				</h2>

				<div className='max-w-md mx-auto'>
					<div className='bg-[#D9D9D9] p-6 rounded-lg shadow-sm'>
						<CartCounter count={totalItems} />

						<form onSubmit={handleSubmit} className='space-y-4'>
							<PhoneInput
								value={phone}
								onChange={handlePhoneChange}
								hasError={phoneError}
								disabled={isSubmitting}
							/>

							<SubmitButton
								isLoading={isSubmitting}
								disabled={totalItems === 0}
								loadingText='Отправляем заказ...'
							>
								Отправить заказ
							</SubmitButton>
						</form>
					</div>
				</div>

				<Modal
					isOpen={showSuccessModal}
					onClose={handleSuccessModalClose}
					title='Заказ отправлен'
				>
					<p className='text-green-600 mb-4'>
						{SUCCESS_MESSAGES.ORDER_SUCCESS}
					</p>
					<p className='text-gray-600'>Мы свяжемся с вами в ближайшее время.</p>
				</Modal>

				<Modal
					isOpen={showErrorModal}
					onClose={handleErrorModalClose}
					title='Ошибка'
				>
					<p className='text-red-600'>{errorMessage}</p>
				</Modal>
			</div>
		</section>
	)
}
