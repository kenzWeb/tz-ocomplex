import { Container } from './Container'
import { SectionTitle } from './SectionTitle'

interface SectionProps {
	id?: string
	title?: string
	children: React.ReactNode
	className?: string
	backgroundClassName?: string
}

export const Section: React.FC<SectionProps> = ({
	id,
	title,
	children,
	className = '',
	backgroundClassName = 'bg-[#292727]',
}) => {
	return (
		<section className={`py-16 ${backgroundClassName} ${className}`} id={id}>
			<Container>
				{title && <SectionTitle>{title}</SectionTitle>}
				{children}
			</Container>
		</section>
	)
}
