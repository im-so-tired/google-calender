import React, { FC } from 'react'

import styles from '../../CrudModal.module.scss'

import MaterialIcon from '@/common/Icon'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'
import ChooseDay from '@/common/Modals/CreateModalComponent/ChooseDay'
import Description from '@/common/Modals/CreateModalComponent/Description'
import Repeat from '@/common/Modals/CreateModalComponent/Repeat'
import StartHour from '@/common/Modals/CreateModalComponent/StartHour'
import '@/common/Select/CustomSelect.scss'

const Task: FC = () => {
	const { control } = useCreateModalContext()
	return (
		<div>
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
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdDescription" />
				</div>
				<div>
					<Description row={1} control={control} />
				</div>
			</div>
		</div>
	)
}

export default Task
