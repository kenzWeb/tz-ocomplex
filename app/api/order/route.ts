import {OrderRequest} from '@/types'
import {NextRequest, NextResponse} from 'next/server'

const API_BASE_URL = 'http://o-complex.com:1337'

export async function POST(request: NextRequest) {
	try {
		const orderData: OrderRequest = await request.json()

		const response = await fetch(`${API_BASE_URL}/order`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		console.error('Error creating order:', error)
		// В случае ошибки API возвращаем ошибку пользователю
		return NextResponse.json({
			success: 0,
			error: 'Произошла ошибка при отправке заказа. Попробуйте позже.',
		})
	}
}
