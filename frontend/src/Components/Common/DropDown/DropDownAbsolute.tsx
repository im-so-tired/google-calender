import cn from 'classnames'
import {
	Dispatch,
	FC,
	MutableRefObject,
	SetStateAction,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import { CSSTransition } from 'react-transition-group'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import { IDropDownProps } from './DropDown.interface'
import styles from './DropDown.module.scss'

interface IDropDownAbs extends Omit<IDropDownProps, 'children'> {
	elem: MutableRefObject<HTMLButtonElement | null>
	opened: boolean
	setOpened: Dispatch<SetStateAction<boolean>>
}

const DropDownAbsolute: FC<IDropDownAbs> = ({
	openingDirection = 'right',
	clickHandler,
	options,
	opened,
	elem,
	setOpened,
}) => {
	const menuRef = useRef<HTMLUListElement | null>(null)
	const [position, setPosition] = useState({ top: 0, left: 0 })
	useOutsideClick(menuRef, elem, () => setOpened(false))
	useLayoutEffect(() => {
		if (!opened) return

		if (!elem.current || !menuRef.current) return
		const elemRect = elem.current.getBoundingClientRect()
		const TOP_SPACE = 5

		setPosition({
			top: elemRect.top + elemRect.height + TOP_SPACE,
			left: elemRect.left + TOP_SPACE,
		})
	}, [opened, elem])
	return (
		<CSSTransition
			nodeRef={menuRef}
			timeout={150}
			in={opened}
			classNames="alert"
			unmountOnExit
		>
			<ul
				ref={menuRef}
				className={cn(styles.menu, styles[openingDirection])}
				style={position}
			>
				{options.map(opt => (
					<li key={opt.value} onClick={() => clickHandler(opt.value)}>
						{opt.label}
					</li>
				))}
			</ul>
		</CSSTransition>
	)
}

export default DropDownAbsolute
