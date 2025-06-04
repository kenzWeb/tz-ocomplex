'use client'

import {Cart, CartItem} from '@/types'
import {createContext, ReactNode, useContext, useEffect, useState} from 'react'

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

interface CartContextType {
	cart: Cart
	addToCart: (productId: number, quantity?: number) => void
	updateQuantity: (productId: number, quantity: number) => void
	removeFromCart: (productId: number) => void
	clearCart: () => void
	getCartItems: () => CartItem[]
	getTotalItems: () => number
	getItemQuantity: (productId: number) => number
	isInitialized: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}

interface CartProviderProps {
	children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
	const [cart, setCart] = useState<Cart>({})
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		const savedCart = loadCartFromStorage()
		console.log('Loading cart from storage:', savedCart)
		setCart(savedCart)
		setIsInitialized(true)
	}, [])

	useEffect(() => {
		if (isInitialized) {
			console.log('Saving cart to storage:', cart)
			saveCartToStorage(cart)
		}
	}, [cart, isInitialized])

	const addToCart = (productId: number, quantity: number = 1) => {
		console.log(`Adding to cart: product ${productId}, quantity ${quantity}`)
		setCart((prev) => {
			const newCart = {
				...prev,
				[productId]: (prev[productId] || 0) + quantity,
			}
			console.log('New cart state:', newCart)
			return newCart
		})
	}

	const updateQuantity = (productId: number, quantity: number) => {
		console.log(`Updating quantity: product ${productId}, quantity ${quantity}`)
		if (quantity <= 0) {
			removeFromCart(productId)
		} else {
			setCart((prev) => {
				const newCart = {...prev, [productId]: quantity}
				console.log('Updated cart state:', newCart)
				return newCart
			})
		}
	}

	const removeFromCart = (productId: number) => {
		console.log(`Removing from cart: product ${productId}`)
		setCart((prev) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const {[productId]: _, ...newCart} = prev
			console.log('Cart after removal:', newCart)
			return newCart
		})
	}

	const clearCart = () => {
		console.log('Clearing cart')
		setCart({})
	}

	const getCartItems = (): CartItem[] =>
		Object.entries(cart).map(([id, quantity]) => ({
			id: parseInt(id),
			quantity,
		}))

	const getTotalItems = (): number => {
		const total = Object.values(cart).reduce(
			(total, quantity) => total + quantity,
			0,
		)
		console.log('Total items in cart:', total)
		return total
	}

	const getItemQuantity = (productId: number): number => cart[productId] || 0

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearCart,
				getCartItems,
				getTotalItems,
				getItemQuantity,
				isInitialized,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
