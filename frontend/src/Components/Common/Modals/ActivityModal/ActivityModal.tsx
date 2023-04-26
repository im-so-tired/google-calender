import cn from 'classnames'
import { FC, PropsWithChildren, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

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
	const modalRef = useRef(null)

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
		<CSSTransition
			nodeRef={modalRef}
			timeout={200}
			in={open}
			classNames="alert"
			unmountOnExit
		>
			<div
				className={cn(mainStyles.baseModal, { [mainStyles.bgDark]: bgDark })}
				onMouseDown={clickOutside}
				ref={modalRef}
			>
				<div
					onMouseDown={e => e.stopPropagation()}
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
		</CSSTransition>
	)
}

export default ActivityModal
