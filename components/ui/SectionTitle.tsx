interface SectionTitleProps {
	children: React.ReactNode
	className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
	children,
	className = '',
}) => {
	return (
		<h2 className={`text-4xl font-bold text-white text-center mb-12 ${className}`}>
			{children}
		</h2>
	)
}
