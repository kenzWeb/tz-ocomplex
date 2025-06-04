import DOMPurify from 'dompurify'

const sanitizeHtmlSSR = (html: string): string =>
	html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
		.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
		.replace(/<embed\b[^<]*>/gi, '')
		.replace(/javascript:/gi, '')
		.replace(/on\w+\s*=/gi, '')

const allowedTags = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'p',
	'br',
	'strong',
	'em',
	'span',
	'div',
]
const allowedAttributes = ['class']
const forbiddenTags = ['script', 'object', 'embed', 'iframe']

export const sanitizeHtml = (html: string): string => {
	if (typeof window === 'undefined') {
		return sanitizeHtmlSSR(html)
	}

	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: allowedTags,
		ALLOWED_ATTR: allowedAttributes,
		FORBID_TAGS: forbiddenTags,
	})
}

export const formatPrice = (price: number): string =>
	new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price)

export const formatPhoneNumber = (phone: string): string => {
	const cleanPhone = phone.replace(/\D/g, '')

	if (cleanPhone.length === 11 && cleanPhone.startsWith('7')) {
		return `+7 (${cleanPhone.slice(1, 4)}) ${cleanPhone.slice(
			4,
			7,
		)}-${cleanPhone.slice(7, 9)}-${cleanPhone.slice(9, 11)}`
	}

	return phone
}

export const truncateText = (text: string, maxLength: number): string =>
	text.length <= maxLength ? text : text.slice(0, maxLength) + '...'
