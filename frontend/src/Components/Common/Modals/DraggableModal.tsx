import cn from 'classnames'
import React, {
	PropsWithChildren,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

import styles from './DraggableModal.module.scss'
import MaterialIcon from '@/common/Icon'
import { IBaseModal } from '@/common/Modals/BaseModal'
import mainStyles from '@/common/Modals/BaseModal.module.scss'

interface Coordinates {
	x: number
	y: number
}

const DraggableModal: React.FC<PropsWithChildren<IBaseModal>> = ({
	children,
	onClose,
	open,
	bgDark,
}) => {
	const modalRef = useRef<HTMLDivElement | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [modalPosition, setModalPosition] = useState<Coordinates>({
		x: Math.round(window.innerWidth / 2) - 224,
		y: Math.round(window.innerHeight / 2),
	})
	const [dragStart, setDragStart] = useState<Coordinates>({ x: 0, y: 0 })
	useLayoutEffect(() => {
		if (!open) return
		const height = modalRef.current?.clientHeight || 0
		setModalPosition({
			x: Math.round(window.innerWidth / 2) - 224,
			y: Math.round(window.innerHeight / 2) - height / 2,
		})
	}, [open])

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (isDragging) {
				const x = event.clientX - dragStart.x
				const y = event.clientY - dragStart.y

				setModalPosition({ x, y })
			}
		}

		const handleMouseUp = () => {
			setIsDragging(false)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [isDragging, dragStart])

	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		setIsDragging(true)
		setDragStart({
			x: event.clientX - modalPosition.x,
			y: event.clientY - modalPosition.y,
		})
	}
	if (!open) return null
	return (
		<div
			className={cn(mainStyles.baseModal, { [mainStyles.bgDark]: bgDark })}
			onMouseDown={onClose}
		>
			<div
				style={{
					top: modalPosition.y,
					left: modalPosition.x,
					position: 'absolute',
				}}
				onMouseDown={e => {
					e.stopPropagation()
				}}
				className={cn(mainStyles.content, styles.content)}
				ref={modalRef}
			>
				<header
					style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
					onMouseDown={handleMouseDown}
				>
					<MaterialIcon name="MdDragHandle" />
					<button onClick={onClose}>
						<MaterialIcon name="MdClose" />
					</button>
				</header>
				<div>{children}</div>
			</div>
		</div>
	)
}

export default DraggableModal
