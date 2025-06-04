export const REVIEW_LIMITS = {
	DISPLAY_COUNT: 2,
	HIGHLIGHT_INDEX: 1,
} as const

export const ERROR_MESSAGES = {
	REVIEWS_LOAD_ERROR: 'Ошибка загрузки отзывов',
	PRODUCTS_LOAD_ERROR: 'Ошибка загрузки товаров',
	ORDER_CREATE_ERROR: 'Ошибка создания заказа',
	PHONE_INVALID: 'Неверный формат номера телефона',
} as const

export const SUCCESS_MESSAGES = {
	ORDER_SUCCESS: 'Заказ успешно отправлен!',
} as const
