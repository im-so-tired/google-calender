import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import styles from '../../CrudModal.module.scss'

import MaterialIcon from '@/common/Icon'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'
import ChooseDay from '@/common/Modals/CrudModalComponent/ChooseDay'
import Description from '@/common/Modals/CrudModalComponent/Description'
import EndHour from '@/common/Modals/CrudModalComponent/EndHour'
import Guests from '@/common/Modals/CrudModalComponent/Guests'
import Repeat from '@/common/Modals/CrudModalComponent/Repeat'
import StartHour from '@/common/Modals/CrudModalComponent/StartHour'
import '@/common/Select/CustomSelect.scss'

const Event: FC = () => {
	const { control, setValue, watch } = useCreateModalContext()
	return (
		<div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdAccessTime" />
				</div>
				<div className={styles.time}>
					<ChooseDay control={control} />
					<StartHour control={control} />
					<span>-</span>
					<EndHour control={control} watch={watch} setValue={setValue} />
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
					<MaterialIcon name="MdPeople" />
				</div>
				<div>
					<Guests control={control} />
				</div>
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

export default Event
