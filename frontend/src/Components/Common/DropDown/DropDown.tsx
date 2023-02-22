import cn from 'classnames'
import { FC, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import styles from './DropDown.module.scss'
import { IDropDownProps } from '@/common/DropDown/DropDown.interface'

const DropDown: FC<IDropDownProps> = ({
	children,
	options,
	openingDirection = 'right',
	clickHandler,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	const toggleRef = useRef(null)
	useOutsideClick(menuRef, toggleRef, () => setIsOpen(false))
	return (
		<div
			ref={toggleRef}
			className={styles.dropDown}
			onClick={() => setIsOpen(prev => !prev)}
		>
			{children}
			{isOpen && (
				<ul
					ref={menuRef}
					className={cn(styles.menu, styles[openingDirection])}
					onClick={() => clickHandler()}
				>
					{options.map(opt => (
						<li key={opt.value}>{opt.label}</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default DropDown
