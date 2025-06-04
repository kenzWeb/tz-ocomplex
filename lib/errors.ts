export class ApiError extends Error {
	constructor(public readonly status: number, message: string) {
		super(message)
		this.name = 'ApiError'
	}
}

export class ValidationError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'ValidationError'
	}
}
