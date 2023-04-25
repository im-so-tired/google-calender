import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'

import confirmModal from '@/store/ConfirmModal'
import modals from '@/store/Modals'
import reminder from '@/store/Reminder'
import task from '@/store/Task'

import mainStyles from '../CrudModal.module.scss'

import Heading from '@/common/ActivityInfo/Heading/Heading'
import Time from '@/common/ActivityInfo/Time/Time'
import ActivityModal from '@/common/Modals/ActivityModal/ActivityModal'
import { IBaseModal } from '@/common/Modals/BaseModal/BaseModal'
import ConfirmReminderDelete from '@/common/Modals/ConfirmModals/Delete/ConfirmReminderDelete'
import ModalRow from '@/common/Modals/ModalRow'
import ReminderEdit from '@/common/Modals/ReminderModal/ReminderEdit'

interface IReminderModal extends IBaseModal {}

const ReminderModal: FC<IReminderModal> = observer(props => {
	const [isEdit, setIsEdit] = useState(false)
	const { onClose } = props
	const { reminderModal } = modals
	const { activity: reminderInfo } = reminderModal
	if (!reminderInfo) return null

	const onDelete = () => {
		if (!reminderInfo.groupId) {
			reminder.delete(reminderInfo.id)
			onClose()
		} else {
			confirmModal.toggleDeleteReminder()
		}
	}
	const reset = () => {
		onClose()
		setIsEdit(false)
	}

	const onEdit = () => {
		setIsEdit(true)
	}

	return (
		<ActivityModal
			{...props}
			deleteHandler={onDelete}
			editHandler={onEdit}
			isEdit={isEdit}
			setIsEdit={setIsEdit}
			bgDark={isEdit}
			position={{ ...reminderModal.position }}
		>
			{isEdit ? (
				<ReminderEdit onClose={reset} />
			) : (
				<>
					<ModalRow>
						<Heading title={reminderInfo.title} />
					</ModalRow>
					<ModalRow icon="MdAccessTime">
						<Time time={reminderInfo.time} />
					</ModalRow>
				</>
			)}
			{reminderInfo.groupId && (
				<ConfirmReminderDelete
					id={reminderInfo.id}
					groupId={reminderInfo.groupId}
					closeMainModal={reset}
				/>
			)}
		</ActivityModal>
	)
})

export default ReminderModal
