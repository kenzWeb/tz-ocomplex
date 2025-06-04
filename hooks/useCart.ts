'use client'

import {Cart, CartItem} from '@/types'
import {useEffect, useState} from 'react'

const CART_STORAGE_KEY = 'o-complex-cart'

const loadCartFromStorage = (): Cart => {
	if (typeof window === 'undefined') return {}

	try {
		const savedCart = localStorage.getItem(CART_STORAGE_KEY)
		return savedCart ? JSON.parse(savedCart) : {}
	} catch {
		return {}
	}
}

const saveCartToStorage = (cart: Cart): void => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
	}
}

export const useCart = () => {
	const [cart, setCart] = useState<Cart>({})
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		const savedCart = loadCartFromStorage()
		setCart(savedCart)
		setIsInitialized(true)
	}, [])

	useEffect(() => {
		if (isInitialized) {
			saveCartToStorage(cart)
		}
	}, [cart, isInitialized])

	const addToCart = (productId: number, quantity: number = 1) => {
		setCart((prev) => ({
			...prev,
			[productId]: (prev[productId] || 0) + quantity,
		}))
	}

	const updateQuantity = (productId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId)
		} else {
			setCart((prev) => ({...prev, [productId]: quantity}))
		}
	}

	const removeFromCart = (productId: number) => {
		setCart((prev) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const {[productId]: _, ...newCart} = prev
			return newCart
		})
	}

	const clearCart = () => setCart({})

	const getCartItems = (): CartItem[] =>
		Object.entries(cart).map(([id, quantity]) => ({
			id: parseInt(id),
			quantity,
		}))

	const getTotalItems = (): number =>
		Object.values(cart).reduce((total, quantity) => total + quantity, 0)

	const getItemQuantity = (productId: number): number => cart[productId] || 0

	return {
		cart,
		addToCart,
		updateQuantity,
		removeFromCart,
		clearCart,
		getCartItems,
		getTotalItems,
		getItemQuantity,
		isInitialized,
	}
}
