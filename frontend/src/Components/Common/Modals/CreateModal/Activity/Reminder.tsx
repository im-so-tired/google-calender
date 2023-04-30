import React, { FC } from 'react'


import { useCreateModalContext } from '@common/Modals/CreateModal/useModalContext'
import ChooseDay from '@common/Modals/CrudModalComponent/ChooseDay'
import Repeat from '@common/Modals/CrudModalComponent/Repeat'
import StartHour from '@common/Modals/CrudModalComponent/StartHour'
import ModalRow from '@common/Modals/ModalRow'
import styles from '../../CrudModal.module.scss'
import '@common/Select/CustomSelect.scss'

const Reminder: FC = () => {
	const { control } = useCreateModalContext()
	return (
		<>
			<ModalRow icon='MdAccessTime'>
				<div className={styles.time}>
					<ChooseDay control={control} />
					<StartHour control={control} />
				</div>
			</ModalRow>
			<ModalRow icon='MdRepeat'>
				<Repeat control={control} />
			</ModalRow>
		</>
	)
}

export default Reminder
