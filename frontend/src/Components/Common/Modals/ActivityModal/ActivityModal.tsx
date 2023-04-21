import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import { IconTypes } from '@/shared/types/IconTypes'
import { Position } from '@/shared/types/position'

import mainStyles from '../BaseModal/BaseModal.module.scss'

import styles from './ActivityModal.module.scss'
import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'
import { IBaseModal } from '@/common/Modals/BaseModal/BaseModal'

export interface IActivityModal extends IBaseModal {
	position: Position
	deleteHandler: () => void
	editHandler: () => void
	isEdit: boolean
	setIsEdit: (value: boolean) => void
}

interface IHeaderIcons {
	name: IconTypes
	onClick: any
}

const ActivityModal: FC<PropsWithChildren<IActivityModal>> = ({
	open,
	onClose,
	children,
	bgDark = false,
	position,
	deleteHandler,
	editHandler,
	isEdit,
	setIsEdit,
}) => {
	if (!open) return null
	const clickOutside = () => {
		setIsEdit(false)
		onClose()
	}
	const headerIcons: IHeaderIcons[] = [
		{ name: 'MdEdit', onClick: editHandler },
		{ name: 'MdDelete', onClick: deleteHandler },
		{ name: 'MdClose', onClick: clickOutside },
	]

	return (
		<div
			className={cn(mainStyles.baseModal, { [mainStyles.bgDark]: bgDark })}
			onMouseDown={clickOutside}
		>
			<div
				onMouseDown={e => {
					e.stopPropagation()
				}}
				className={cn(mainStyles.content, styles.content)}
				style={position}
			>
				<header className={styles.header}>
					{headerIcons.map(icon => {
						if (icon.name === 'MdEdit' && isEdit) return null
						return (
							<CircleBtn
								key={icon.name}
								icon={icon.name}
								onClick={icon.onClick}
							/>
						)
					})}
				</header>
				{children}
			</div>
		</div>
	)
}

export default ActivityModal
