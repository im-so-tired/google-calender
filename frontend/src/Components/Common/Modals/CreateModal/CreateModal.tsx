import React, { useEffect, useState } from 'react'

const Modal = ({ children }) => {
	const [isDragging, setIsDragging] = useState(false)
	const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = event => {
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

	const handleMouseDown = event => {
		setIsDragging(true)
		setDragStart({
			x: event.clientX - modalPosition.x,
			y: event.clientY - modalPosition.y,
		})
	}

	return (
		<div
			style={{
				position: 'absolute',
				top: modalPosition.y,
				left: modalPosition.x,
				border: '1px solid black',
				padding: '20px',
				cursor: isDragging ? 'grabbing' : 'grab',
			}}
			onMouseDown={handleMouseDown}
		>
			{children}
		</div>
	)
}

export default Modal
