import {CartProvider} from '@/contexts/CartContext'
import {ToastProvider} from '@/hooks/useToast'
import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'O-Complex - Интернет-магазин качественных товаров',
	description:
		'Широкий ассортимент товаров с быстрой доставкой. Читайте отзывы клиентов и заказывайте онлайн.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#242121]`}
			>
				<ToastProvider>
					<CartProvider>{children}</CartProvider>
				</ToastProvider>
			</body>
		</html>
	)
}
