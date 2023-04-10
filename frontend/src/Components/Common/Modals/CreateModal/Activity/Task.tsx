import React, { FC } from 'react'

import styles from '../CreateModal.module.scss'

import MaterialIcon from '@/common/Icon'
import ChooseDay from '@/common/Modals/ModalComponent/ChooseDay'
import Description from '@/common/Modals/ModalComponent/Description'
import Repeat from '@/common/Modals/ModalComponent/Repeat'
import StartHour from '@/common/Modals/ModalComponent/StartHour'
import '@/common/Select/CustomSelect.scss'

const Task: FC = () => {
	return (
		<div>
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

export default Task
