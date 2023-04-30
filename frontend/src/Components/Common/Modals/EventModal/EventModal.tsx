import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FC, useState } from 'react'

import confirmModal from '@store/ConfirmModal'
import event from '@store/Event'
import modals from '@store/Modals'

import Heading from '@common/ActivityInfo/Heading/Heading'
import ActivityModal from '@common/Modals/ActivityModal/ActivityModal'
import { IBaseModal } from '@common/Modals/BaseModal/BaseModal'
import ConfirmEventDelete from '@common/Modals/ConfirmModals/Delete/ConfirmEventDelete'
import EventEdit from '@common/Modals/EventModal/EventEdit'
import ModalRow from '@common/Modals/ModalRow'

interface IEventModal extends IBaseModal {
}

const EventModal: FC<IEventModal> = observer(props => {
	const [isEdit, setIsEdit] = useState(false)
	const { onClose } = props
	const { eventModal } = modals
	const { activity: eventInfo } = eventModal
	if (!eventInfo) return null

	const onDelete = () => {
		if (!eventInfo.groupId) {
			event.delete(eventInfo.id)
			onClose()
		} else {
			confirmModal.toggleDeleteEvent()
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
			position={{ ...eventModal.position }}
		>
			{isEdit ? (
				<EventEdit onClose={reset} />
			) : (
				<>
					<ModalRow>
						<Heading title={eventInfo.title} />
						<span>
							{moment.unix(eventInfo.startTime).format('dddd, D MMMM ⋅ ha - ')}
							{moment.unix(eventInfo.endTime).format('ha')}
						</span>
					</ModalRow>
					{eventInfo.description && (
						<ModalRow icon='MdDescription'>
							<p>{eventInfo.description}</p>
						</ModalRow>
					)}
					{eventInfo.guests && (
						<ModalRow icon='MdPeople'>
							<p>{eventInfo.guests}</p>
						</ModalRow>
					)}
				</>
			)}
			{eventInfo.groupId && (
				<ConfirmEventDelete
					id={eventInfo.id}
					groupId={eventInfo.groupId}
					closeMainModal={reset}
				/>
			)}
		</ActivityModal>
	)
})

export default EventModal
