import {NextResponse} from 'next/server'

const API_BASE_URL = 'http://o-complex.com:1337'

export async function GET() {
	try {
		const response = await fetch(`${API_BASE_URL}/reviews`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		console.error('Error fetching reviews:', error)
		// Возвращаем пустой массив в случае ошибки
		return NextResponse.json([])
	}
}
