export const API_CONFIG = {
	BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
	TIMEOUT: 10000,
	RETRY_ATTEMPTS: 3,
} as const

export const PAGINATION_CONFIG = {
	DEFAULT_PAGE_SIZE: 20,
	MAX_PAGE_SIZE: 100,
} as const
