import {OrderRequest, OrderResponse} from '@/types'
import {ApiError} from '../errors'
import {HttpClient} from '../http-client'

export class OrdersService {
	constructor(private readonly httpClient: HttpClient) {}

	async create(orderData: OrderRequest): Promise<OrderResponse> {
		try {
			return await this.httpClient.post<OrderResponse>('/order', orderData)
		} catch (error) {
			if (error instanceof ApiError) {
				console.error('Failed to create order:', error.message)
				return {
					success: 0,
					error: 'Произошла ошибка при отправке заказа. Попробуйте позже.',
				}
			}
			throw error
		}
	}
}
