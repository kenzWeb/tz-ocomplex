// Типы для API
export interface Review {
	id: number
	name: string
	rating: number
	text: string
}

export interface Product {
	id: number
	image_url: string
	title: string
	description: string
	price: number
}

export interface ProductsResponse {
	page: number
	amount: number
	total: number
	items: Product[]
}

// Типы для корзины
export interface CartItem {
	id: number
	quantity: number
}

export interface Cart {
	[productId: number]: number
}

// Типы для заказа
export interface OrderRequest {
	phone: string
	cart: CartItem[]
}

export interface OrderResponse {
	success: number
	error?: string
}
