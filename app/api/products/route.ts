import {NextRequest, NextResponse} from 'next/server'

const API_BASE_URL = 'http://o-complex.com:1337'

export async function GET(request: NextRequest) {
	try {
		const {searchParams} = new URL(request.url)
		const page = searchParams.get('page') || '1'
		const pageSize = searchParams.get('page_size') || '20'

		const response = await fetch(
			`${API_BASE_URL}/products?page=${page}&page_size=${pageSize}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		console.error('Error fetching products:', error)
		// Возвращаем пустой результат в случае ошибки
		const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
		return NextResponse.json({
			page,
			amount: 0,
			total: 0,
			items: [],
		})
	}
}
