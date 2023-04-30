import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { repeatOption } from '@shared/constants/repeatOption'

import confirmModal from '@store/ConfirmModal'
import modals from '@store/Modals'
import reminderMobx from '@store/Reminder'


import ConfirmReminderUpdate from '@common/Modals/ConfirmModals/Update/ConfirmReminderUpdate'
import ChooseDay from '@common/Modals/CrudModalComponent/ChooseDay'
import Repeat from '@common/Modals/CrudModalComponent/Repeat'
import StartHour from '@common/Modals/CrudModalComponent/StartHour'
import Title from '@common/Modals/CrudModalComponent/Title'
import { IReminderData } from '@common/Modals/Helpers/FormData.interface'
import { startTimeOption } from '@common/Modals/Helpers/createOptions'
import ModalRow from '@common/Modals/ModalRow'
import mainStyles from '../CrudModal.module.scss'

const ReminderEdit: FC<{ onClose: () => void }> = observer(({ onClose }) => {
	const { activity: reminder } = modals.reminderModal
	if (!reminder) return null
	const { handleSubmit, control, reset } = useForm<IReminderData>({
		defaultValues: {
			title: reminder.title,
			day: moment.unix(reminder.time || 0),
			startHour: startTimeOption.find(
				op => op.value === moment.unix(reminder.time || 0).hour(),
			),
			repeat: repeatOption.find(op => op.value === reminder.repeat),
		},
	})

	const onSubmit = (data: IReminderData) => {
		const newValue = {
			title: data.title,
			repeat: data.repeat.value,
			time: data.day.hour(data.startHour.value).unix(),
		}
		if (!reminder.groupId) {
			reminderMobx.update(reminder.id, newValue)
			onClose()
		} else {
			confirmModal.toggleUpdateReminder(newValue, reminder.id)
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
				<ModalRow icon='MdAccessTime'>
					<div className={mainStyles.time}>
						<ChooseDay control={control} />
						<StartHour control={control} />
					</div>
				</ModalRow>
				<ModalRow icon='MdRepeat'>
					<Repeat control={control} />
				</ModalRow>
				<div className={mainStyles.footer}>
					<button className='primaryBtn' type='submit'>
						Save
					</button>
				</div>
			</form>
			{reminder.groupId && (
				<ConfirmReminderUpdate
					closeMainModal={onClose}
					groupId={reminder.groupId}
					id={reminder.id}
				/>
			)}
		</>
	)
})

export default ReminderEdit
