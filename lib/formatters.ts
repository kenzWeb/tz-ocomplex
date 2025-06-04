export const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
	}).format(price)
}

export const formatPhoneNumber = (phone: string): string => {
	const cleaned = phone.replace(/\D/g, '')
	if (cleaned.length === 11 && cleaned.startsWith('7')) {
		return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
			7,
			9,
		)}-${cleaned.slice(9, 11)}`
	}
	return phone
}
