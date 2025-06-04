import {ProductsResponse} from '@/types'
import {ApiError} from '../errors'
import {HttpClient} from '../http-client'

export class ProductsService {
	constructor(private readonly httpClient: HttpClient) {}

	async getAll(
		page: number = 1,
		pageSize: number = 20,
	): Promise<ProductsResponse> {
		try {
			return await this.httpClient.get<ProductsResponse>(
				`/products?page=${page}&page_size=${pageSize}`,
			)
		} catch (error) {
			if (error instanceof ApiError) {
				console.error('Failed to fetch products:', error.message)
				return {
					page,
					amount: 0,
					total: 0,
					items: [],
				}
			}
			throw error
		}
	}
}
