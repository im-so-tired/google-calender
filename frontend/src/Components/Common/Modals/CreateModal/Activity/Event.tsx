import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import styles from '../CreateModal.module.scss'

import MaterialIcon from '@/common/Icon'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'
import ChooseDay from '@/common/Modals/ModalComponent/ChooseDay'
import Description from '@/common/Modals/ModalComponent/Description'
import EndHour from '@/common/Modals/ModalComponent/EndHour'
import Repeat from '@/common/Modals/ModalComponent/Repeat'
import StartHour from '@/common/Modals/ModalComponent/StartHour'
import '@/common/Select/CustomSelect.scss'

const Event: FC = () => {
	const { control } = useCreateModalContext()
	return (
		<div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdAccessTime" />
				</div>
				<div className={styles.time}>
					<ChooseDay />
					<StartHour />
					<span>-</span>
					<EndHour />
				</div>
			</div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdRepeat" />
				</div>
				<Repeat />
			</div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdPeople" />
				</div>
				<div>
					<Controller
						render={({ field }) => (
							<input
								{...field}
								className="modalTextField"
								placeholder="Add guests"
								style={{ width: '100%', boxSizing: 'border-box' }}
							/>
						)}
						name="guests"
						control={control}
					/>
				</div>
			</div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdDescription" />
				</div>
				<div>
					<Description />
				</div>
			</div>
		</div>
	)
}

export default Event
