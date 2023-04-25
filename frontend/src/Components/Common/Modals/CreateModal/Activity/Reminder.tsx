import React, { FC } from 'react'

import styles from '../../CrudModal.module.scss'

import MaterialIcon from '@/common/Icon'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'
import ChooseDay from '@/common/Modals/CrudModalComponent/ChooseDay'
import Repeat from '@/common/Modals/CrudModalComponent/Repeat'
import StartHour from '@/common/Modals/CrudModalComponent/StartHour'
import '@/common/Select/CustomSelect.scss'

const Reminder: FC = () => {
	const { control } = useCreateModalContext()
	return (
		<>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdAccessTime" />
				</div>
				<div className={styles.time}>
					<ChooseDay control={control} />
					<StartHour control={control} />
				</div>
			</div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdRepeat" />
				</div>
				<Repeat control={control} />
			</div>
		</>
	)
}

export default Reminder
