import {LoadingSpinner} from './Loader'

interface LoadingStateProps {
	title: string
	className?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
	title,
	className = '',
}) => {
	return (
		<section className={`py-16 bg-[#292727] ${className}`}>
			<div className='container mx-auto px-4'>
				<h2 className='text-4xl font-bold text-white text-center mb-12'>
					{title}
				</h2>
				<div className='flex justify-center'>
					<LoadingSpinner />
				</div>
			</div>
		</section>
	)
}
