import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import modals, { CreateModalType } from '@/store/Modals'

import styles from './CreateModal.module.scss'
import TitleInput from '@/common/Inputs/TitleInput/TitleInput'
import { IBaseModal } from '@/common/Modals/BaseModal'
import Event from '@/common/Modals/CreateModal/Event'
import DraggableModal from '@/common/Modals/DraggableModal'

interface CreateModalProps extends IBaseModal {}

const btns: CreateModalType[] = ['event', 'task', 'reminder']
const CreateModal: FC<CreateModalProps> = observer(({ ...props }) => {
	const created = modals.createModal.type
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
								onClick={() => modals.changeCreateModalType(value)}
							>
								{value}
							</button>
						))}
					</div>
				</div>
				{created === 'event' ? <Event /> : null}
			</section>
		</DraggableModal>
	)
})

export default CreateModal
