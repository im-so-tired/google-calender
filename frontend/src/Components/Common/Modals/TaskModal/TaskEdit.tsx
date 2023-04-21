import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { repeatOption } from '@/shared/constants/repeatOption'

import confirmModal from '@/store/ConfirmModal'
import modals from '@/store/Modals'
import taskMobx from '@/store/Task'

import mainStyles from '../CrudModal.module.scss'

import ConfirmTaskUpdate from '@/common/Modals/ConfirmModals/Update/ConfirmTaskUpdate'
import ChooseDay from '@/common/Modals/CreateModalComponent/ChooseDay'
import Description from '@/common/Modals/CreateModalComponent/Description'
import Repeat from '@/common/Modals/CreateModalComponent/Repeat'
import StartHour from '@/common/Modals/CreateModalComponent/StartHour'
import Title from '@/common/Modals/CreateModalComponent/Title'
import styles from '@/common/Modals/CrudModal.module.scss'
import { ITaskData } from '@/common/Modals/Helpers/FormData.interface'
import { startTimeOption } from '@/common/Modals/Helpers/createOptions'
import ModalRow from '@/common/Modals/ModalRow'

const TaskEdit: FC<{ onClose: () => void }> = observer(({ onClose }) => {
	const { task } = modals.taskModal
	if (!task) return null
	const { handleSubmit, control, reset } = useForm<ITaskData>({
		defaultValues: {
			title: task.title,
			description: task.description,
			day: moment.unix(task.time || 0),
			startHour: startTimeOption.find(
				op => op.value === moment.unix(task.time || 0).hour()
			),
			repeat: repeatOption.find(op => op.value === task.repeat),
		},
	})

	const onSubmit = (data: ITaskData) => {
		const newValue = {
			title: data.title,
			repeat: data.repeat.value,
			time: data.day.hour(data.startHour.value).unix(),
			description: data.description,
		}
		if (!task.groupId) {
			taskMobx.update(task.id, newValue)
			onClose()
		} else {
			confirmModal.toggleUpdateTask(newValue, task.id)
		}
	}

	useEffect(() => {
		return () => reset()
	}, [reset])
	return (
		<>
			<form className={mainStyles.editForm} onSubmit={handleSubmit(onSubmit)}>
				<ModalRow>
					<Title control={control} />
				</ModalRow>
				<ModalRow icon="MdAccessTime">
					<div className={mainStyles.time}>
						<ChooseDay control={control} />
						<StartHour control={control} />
					</div>
				</ModalRow>
				<ModalRow icon="MdRepeat">
					<Repeat control={control} />
				</ModalRow>
				<ModalRow icon="MdDescription">
					<Description row={4} control={control} />
				</ModalRow>
				<div className={mainStyles.footer}>
					<button className="primaryBtn" type="submit">
						Save
					</button>
				</div>
			</form>
			{task.groupId && (
				<ConfirmTaskUpdate
					closeMainModal={onClose}
					groupId={task.groupId}
					id={task.id}
				/>
			)}
		</>
	)
})

export default TaskEdit
