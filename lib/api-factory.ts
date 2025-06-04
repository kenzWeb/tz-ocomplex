import {HttpClient} from './http-client'
import {OrdersService} from './services/orders'
import {ProductsService} from './services/products'
import {ReviewsService} from './services/reviews'

class ApiFactory {
	private readonly httpClient: HttpClient
	private readonly reviewsService: ReviewsService
	private readonly productsService: ProductsService
	private readonly ordersService: OrdersService

	constructor() {
		this.httpClient = new HttpClient('/api')
		this.reviewsService = new ReviewsService(this.httpClient)
		this.productsService = new ProductsService(this.httpClient)
		this.ordersService = new OrdersService(this.httpClient)
	}

	get reviews() {
		return this.reviewsService
	}

	get products() {
		return this.productsService
	}

	get orders() {
		return this.ordersService
	}
}

export const api = new ApiFactory()
