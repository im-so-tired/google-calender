import cn from 'classnames'
import { FC, PropsWithChildren, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './BaseModal.module.scss'

export interface IBaseModal {
	open: boolean
	onClose: () => void
	bgDark?: boolean
}

const BaseModal: FC<PropsWithChildren<IBaseModal>> = ({
	open,
	onClose,
	children,
	bgDark = false,
}) => {
	const modalRef = useRef(null)
	return (
		<CSSTransition
			nodeRef={modalRef}
			timeout={200}
			in={open}
			classNames="alert"
			unmountOnExit
		>
			<div
				ref={modalRef}
				className={cn(styles.baseModal, { [styles.bgDark]: bgDark })}
				onMouseDown={onClose}
			>
				<div onMouseDown={e => e.stopPropagation()} className={styles.content}>
					{children}
				</div>
			</div>
		</CSSTransition>
	)
}

export default BaseModal
