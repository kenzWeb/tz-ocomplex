'use client'

import {createContext, ReactNode, useContext, useState} from 'react'
import {Toast} from '../components/ui/Toast'

interface ToastContextType {
	showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}

interface ToastProviderProps {
	children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
	const [toast, setToast] = useState<{
		message: string
		type: 'success' | 'error' | 'info'
		isVisible: boolean
	} | null>(null)

	const showToast = (
		message: string,
		type: 'success' | 'error' | 'info' = 'info',
	) => {
		setToast({message, type, isVisible: true})
	}

	const hideToast = () => {
		setToast(null)
	}

	return (
		<ToastContext.Provider value={{showToast}}>
			{children}
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					isVisible={toast.isVisible}
					onClose={hideToast}
				/>
			)}
		</ToastContext.Provider>
	)
}
