import React, { FC, PropsWithChildren } from 'react'

import { IconTypes } from '@shared/types/IconTypes'

import MaterialIcon from '@common/Icon'
import styles from './CrudModal.module.scss'

interface ModalRowProps {
	icon?: IconTypes
}

const ModalRow: FC<PropsWithChildren<ModalRowProps>> = ({ icon, children }) => {
	return (
		<div className={styles.flexComp}>
			<div>{icon ? <MaterialIcon name={icon} /> : null}</div>
			<div>{children}</div>
		</div>
	)
}

export default ModalRow
