import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { repeatOption } from '@/shared/constants/repeatOption'

import event from '@/store/Event'
import modals from '@/store/Modals'
import reminder from '@/store/Reminder'
import task from '@/store/Task'

import styles from '../CrudModal.module.scss'

import { IBaseModal } from '@/common/Modals/BaseModal/BaseModal'
import { CreateModalProvider } from '@/common/Modals/CreateModal/useModalContext'
import ChooseActivity from '@/common/Modals/CreateModal/СhooseActivity'
import Title from '@/common/Modals/CreateModalComponent/Title'
import DraggableModal from '@/common/Modals/DraggableModal/DraggableModal'
import { IFormData } from '@/common/Modals/Helpers/FormData.interface'
import {
	endTimeOption,
	startTimeOption,
} from '@/common/Modals/Helpers/createOptions'

interface CreateModalProps extends IBaseModal {}

const CreateModal: FC<CreateModalProps> = observer(({ onClose, ...props }) => {
	const { type, selectedDate: date } = modals.createModal
	const { handleSubmit, setValue, control, watch, getValues, reset } =
		useForm<IFormData>({
			defaultValues: {
				title: '',
				description: '',
				day: date,
				guests: '',
				endHour: endTimeOption.find(op => op.value === date.hour() + 1),
				startHour: startTimeOption.find(op => op.value === date.hour()),
				repeat: repeatOption[0],
			},
		})
	const onSubmit = (data: IFormData) => {
		switch (type) {
			case 'task':
				task.createTask({
					time: moment(data.day).hour(data.startHour.value).minute(0).unix(),
					repeat: data.repeat.value,
					description: data.description,
					title: data.title,
				})
				break
			case 'event':
				event.create({
					startTime: moment(data.day)
						.hour(data.startHour.value)
						.minute(0)
						.unix(),
					endTime: moment(data.day).hour(data.endHour.value).minute(0).unix(),
					repeat: data.repeat.value,
					description: data.description,
					title: data.title,
					guests: data.guests,
				})
				break
			case 'reminder':
				reminder.create({
					time: moment(data.day).hour(data.startHour.value).minute(0).unix(),
					repeat: data.repeat.value,
					title: data.title,
				})
				break
			default:
				toast.error('Error creating!')
		}
		onClose()
	}

	useEffect(() => {
		return () => reset()
	}, [reset])
	return (
		<CreateModalProvider value={{ setValue, control, getValues, watch }}>
			<DraggableModal {...props} onClose={onClose}>
				<form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.flexComp}>
						<div />
						<div>
							<Title control={control} />
						</div>
					</div>
					<ChooseActivity />
					<div className={styles.footer}>
						<button className="primaryBtn" type="submit">
							Save
						</button>
					</div>
				</form>
			</DraggableModal>
		</CreateModalProvider>
	)
})

export default CreateModal
