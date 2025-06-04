interface LoaderProps {
	className?: string
	size?: 'sm' | 'md' | 'lg'
}

export const Loader: React.FC<LoaderProps> = ({
	className = '',
	size = 'md',
}) => {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12',
	}

	return (
		<div
			className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`}
		/>
	)
}

export const LoadingSpinner: React.FC<{text?: string}> = ({
	text = 'Загрузка...',
}) => {
	return (
		<div className='flex flex-col items-center justify-center py-8'>
			<Loader size='lg' />
			<p className='mt-4 text-gray-600'>{text}</p>
		</div>
	)
}
