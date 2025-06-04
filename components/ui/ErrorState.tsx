interface ErrorStateProps {
	title: string
	message: string
	className?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({
	title,
	message,
	className = '',
}) => {
	return (
		<section className={`py-16 bg-[#292727] ${className}`}>
			<div className='container mx-auto px-4'>
				<h2 className='text-4xl font-bold text-white text-center mb-12'>
					{title}
				</h2>
				<div className='text-center text-red-400'>{message}</div>
			</div>
		</section>
	)
}
