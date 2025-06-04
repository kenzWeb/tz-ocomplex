import {Review} from '@/types'
import {ApiError} from '../errors'
import {HttpClient} from '../http-client'

export class ReviewsService {
	constructor(private readonly httpClient: HttpClient) {}

	async getAll(): Promise<Review[]> {
		try {
			return await this.httpClient.get<Review[]>('/reviews')
		} catch (error) {
			if (error instanceof ApiError) {
				console.error('Failed to fetch reviews:', error.message)
				return []
			}
			throw error
		}
	}
}
