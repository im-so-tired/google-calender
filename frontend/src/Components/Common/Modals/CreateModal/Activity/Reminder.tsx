import React, { FC } from 'react'

import styles from '../../CrudModal.module.scss'

import MaterialIcon from '@/common/Icon'
import ChooseDay from '@/common/Modals/ModalComponent/ChooseDay'
import Repeat from '@/common/Modals/ModalComponent/Repeat'
import StartHour from '@/common/Modals/ModalComponent/StartHour'
import '@/common/Select/CustomSelect.scss'

const Reminder: FC = () => {
	return (
		<>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdAccessTime" />
				</div>
				<div className={styles.time}>
					<ChooseDay />
					<StartHour />
				</div>
			</div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdRepeat" />
				</div>
				<Repeat />
			</div>
		</>
	)
}

export default Reminder
