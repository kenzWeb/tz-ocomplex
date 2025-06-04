'use client'

import {useEffect, useState} from 'react'

const PHONE_STORAGE_KEY = 'o-complex-phone'

const loadPhoneFromStorage = (): string => {
	if (typeof window === 'undefined') return ''
	return localStorage.getItem(PHONE_STORAGE_KEY) || ''
}

const savePhoneToStorage = (phone: string): void => {
	if (typeof window !== 'undefined' && phone) {
		localStorage.setItem(PHONE_STORAGE_KEY, phone)
	}
}

const removePhoneFromStorage = (): void => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(PHONE_STORAGE_KEY)
	}
}

const validatePhone = (phone: string): boolean => {
	const cleanPhone = phone.replace(/\D/g, '')
	return cleanPhone.length === 11 && cleanPhone.startsWith('7')
}

export const usePhone = () => {
	const [phone, setPhone] = useState<string>('')
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		const savedPhone = loadPhoneFromStorage()
		setPhone(savedPhone)
		setIsInitialized(true)
	}, [])

	useEffect(() => {
		if (isInitialized) {
			savePhoneToStorage(phone)
		}
	}, [phone, isInitialized])

	const updatePhone = (newPhone: string) => setPhone(newPhone)

	const clearPhone = () => {
		setPhone('')
		removePhoneFromStorage()
	}

	const isValidPhone = (): boolean => validatePhone(phone)

	return {
		phone,
		updatePhone,
		clearPhone,
		isValidPhone,
	}
}
