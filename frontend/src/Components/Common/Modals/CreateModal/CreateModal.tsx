import React, { FC, useState } from 'react'

import { CreateModalType } from '@/store/Modals'

import styles from './CreateModal.module.scss'
import TitleInput from '@/common/Inputs/TitleInput/TitleInput'
import { IBaseModal } from '@/common/Modals/BaseModal'
import DraggableModal from '@/common/Modals/DraggableModal'

interface CreateModalProps extends IBaseModal {
	type: 'event' | 'task' | 'reminder'
}

const btns: CreateModalType[] = ['event', 'task', 'reminder']
const CreateModal: FC<CreateModalProps> = ({ type, ...props }) => {
	const [created, setCreated] = useState<CreateModalType>(type)
	return (
		<DraggableModal {...props}>
			<section className={styles.main}>
				<div className={styles.flexComp}>
					<div />
					<div>
						<TitleInput />
					</div>
				</div>
				<div className={styles.flexComp}>
					<div />
					<div className={styles.selectTheCreated}>
						{btns.map(value => (
							// eslint-disable-next-line jsx-a11y/control-has-associated-label
							<button
								key={value}
								className={created === value ? styles.selected : ''}
								onClick={() => setCreated(value)}
							>
								{value}
							</button>
						))}
					</div>
				</div>
			</section>
		</DraggableModal>
	)
}

export default CreateModal
