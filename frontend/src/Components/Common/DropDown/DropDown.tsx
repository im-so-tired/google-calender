import cn from 'classnames'
import React, { FC, PropsWithChildren, useRef, useState } from 'react'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import { IOption } from '@/shared/types/SelectOpt'

import styles from './DropDown.module.scss'

interface IDropDownProps {
	options: IOption[]
	className?: string
	clickHandler: () => void
	children: React.ReactNode
	openingDirection?: 'left' | 'right' | 'center'
}

const DropDown: FC<IDropDownProps> = ({
	children,
	options,
	className,
	clickHandler,
	openingDirection = 'right',
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	useOutsideClick(menuRef, () => setIsOpen(false))
	return (
		<div className={styles.dropDown} onClick={() => setIsOpen(prev => !prev)}>
			{children}
			{isOpen && (
				<ul ref={menuRef} className={cn(styles.menu, styles[openingDirection])}>
					{options.map(opt => (
						<li key={opt.value}>{opt.label}</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default DropDown
