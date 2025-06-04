import {CartSection} from '@/components/CartSection'
import {ProductsSection} from '@/components/ProductsSection'
import {ReviewsSection} from '@/components/ReviewsSection'

export default function Home() {
	return (
		<div className='min-h-screen bg-[#292727]'>
			<main>
				<section className='py-12 bg-[#292727] text-white'>
					<div className='container mx-auto px-4 text-center'>
						{' '}
						<div className='bg-[#777777] rounded-2xl py-8 px-6 max-w-2xl mx-auto shadow-lg'>
							<h1 className='text-3xl md:text-4xl font-bold'>
								Тестовое задание
							</h1>
						</div>
					</div>
				</section>

				<ReviewsSection />

				<CartSection />

				<ProductsSection />
			</main>
		</div>
	)
}
