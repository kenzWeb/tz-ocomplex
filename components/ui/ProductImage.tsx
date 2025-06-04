'use client'

import Image from 'next/image'
import {useState} from 'react'

interface ProductImageProps {
	src: string
	alt: string
	className?: string
}

export const ProductImage: React.FC<ProductImageProps> = ({
	src,
	alt,
	className = '',
}) => {
	const [imageError, setImageError] = useState(false)

	const fallbackIcon = (
		<div className='flex items-center justify-center h-full text-black'>
			<svg
				className='w-12 h-12'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
				/>
			</svg>
		</div>
	)

	return (
		<div className={`relative h-48 bg-[#D9D9D9] ${className}`}>
			{!imageError ? (
				<Image
					src={src}
					alt={alt}
					fill
					className='object-cover'
					onError={() => setImageError(true)}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			) : (
				fallbackIcon
			)}
		</div>
	)
}
