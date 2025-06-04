import {ApiError} from './errors'

export class HttpClient {
	private readonly baseUrl: string
	private readonly defaultHeaders: Record<string, string>

	constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
		this.baseUrl = baseUrl
		this.defaultHeaders = {
			'Content-Type': 'application/json',
			...defaultHeaders,
		}
	}

	private async makeRequest<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`
		const config: RequestInit = {
			...options,
			headers: {
				...this.defaultHeaders,
				...options.headers,
			},
		}

		try {
			const response = await fetch(url, config)

			if (!response.ok) {
				throw new ApiError(
					response.status,
					`HTTP error! status: ${response.status}`,
				)
			}

			return await response.json()
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			throw new ApiError(500, 'Network error occurred')
		}
	}

	async get<T>(endpoint: string): Promise<T> {
		return this.makeRequest<T>(endpoint, {method: 'GET'})
	}

	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.makeRequest<T>(endpoint, {
			method: 'POST',
			body: data ? JSON.stringify(data) : undefined,
		})
	}
}
