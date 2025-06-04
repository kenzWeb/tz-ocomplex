import {formatPhoneNumber} from '@/lib/utils'

interface PhoneInputProps {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	hasError: boolean
	disabled?: boolean
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
	value,
	onChange,
	hasError,
	disabled = false,
}) => {
	return (
		<div>
			<label
				htmlFor='phone'
				className='block text-sm font-medium text-black mb-2'
			>
				Номер телефона *
			</label>
			<input
				type='tel'
				id='phone'
				value={formatPhoneNumber(value)}
				onChange={onChange}
				placeholder='+7 (999) 999-99-99'
				className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
					hasError ? 'border-red-500' : 'border-gray-300'
				}`}
				disabled={disabled}
				required
			/>
			{hasError && (
				<p className='mt-1 text-sm text-red-600'>
					Введите корректный номер телефона
				</p>
			)}
		</div>
	)
}
