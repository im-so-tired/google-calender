import cn from 'classnames'
import React, { FC, PropsWithChildren } from 'react'

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
	if (!open) return null
	return (
		<div
			className={cn(styles.baseModal, { [styles.bgDark]: bgDark })}
			onMouseDown={onClose}
		>
			<div
				onMouseDown={e => {
					e.stopPropagation()
				}}
				className={styles.content}
			>
				{children}
			</div>
		</div>
	)
}

export default BaseModal
