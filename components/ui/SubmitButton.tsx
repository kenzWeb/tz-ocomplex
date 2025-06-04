import {Loader} from './Loader'

interface SubmitButtonProps {
	isLoading: boolean
	disabled: boolean
	children: React.ReactNode
	loadingText?: string
	className?: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
	isLoading,
	disabled,
	children,
	loadingText = 'Загрузка...',
	className = '',
}) => {
	return (
		<button
			type='submit'
			disabled={isLoading || disabled}
			className={`w-full bg-[#222222] text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium ${className}`}
		>
			{isLoading ? (
				<div className='flex items-center justify-center gap-2'>
					<Loader size='sm' />
					<span>{loadingText}</span>
				</div>
			) : (
				children
			)}
		</button>
	)
}
