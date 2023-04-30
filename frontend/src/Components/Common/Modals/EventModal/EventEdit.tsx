import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { repeatOption } from '@shared/constants/repeatOption'
import { DtoEvent } from '@shared/types/event'

import confirmModal from '@store/ConfirmModal'
import eventMobx from '@store/Event'
import modals from '@store/Modals'


import ConfirmEventUpdate from '@common/Modals/ConfirmModals/Update/ConfirmEventUpdate'
import ChooseDay from '@common/Modals/CrudModalComponent/ChooseDay'
import Description from '@common/Modals/CrudModalComponent/Description'
import EndHour from '@common/Modals/CrudModalComponent/EndHour'
import Guests from '@common/Modals/CrudModalComponent/Guests'
import Repeat from '@common/Modals/CrudModalComponent/Repeat'
import StartHour from '@common/Modals/CrudModalComponent/StartHour'
import Title from '@common/Modals/CrudModalComponent/Title'
import { IEventData } from '@common/Modals/Helpers/FormData.interface'
import {
	endTimeOption,
	startTimeOption,
} from '@common/Modals/Helpers/createOptions'
import ModalRow from '@common/Modals/ModalRow'
import mainStyles from '../CrudModal.module.scss'

const EventEdit: FC<{ onClose: () => void }> = observer(({ onClose }) => {
	const { activity: event } = modals.eventModal
	if (!event) return null
	const { handleSubmit, control, reset, setValue, watch } = useForm<IEventData>(
		{
			defaultValues: {
				title: event.title,
				description: event.description,
				day: moment.unix(event.startTime || 0),
				startHour: startTimeOption.find(
					op => op.value === moment.unix(event.startTime || 0).hour(),
				),
				endHour: endTimeOption.find(
					op => op.value === moment.unix(event.endTime || 0).hour(),
				),
				repeat: repeatOption.find(op => op.value === event.repeat),
				guests: event.guests,
			},
		},
	)

	const onSubmit = (data: IEventData) => {
		const newValue: DtoEvent = {
			title: data.title,
			repeat: data.repeat.value,
			startTime: data.day.hour(data.startHour.value).unix(),
			endTime: data.day.hour(data.endHour.value).unix(),
			description: data.description,
			guests: data.guests,
		}
		if (!event.groupId) {
			eventMobx.update(event.id, newValue)
			onClose()
		} else {
			confirmModal.toggleUpdateEvent(newValue, event.id)
		}
	}

	useEffect(() => {
		return () => reset()
	}, [reset])
	return (
		<>
			<form className={mainStyles.editForm} onSubmit={handleSubmit(onSubmit)}>
				<ModalRow>
					<Title<IEventData> control={control} />
				</ModalRow>
				<ModalRow icon='MdAccessTime'>
					<div className={mainStyles.time}>
						<ChooseDay control={control} />
						<StartHour control={control} />
						<span>-</span>
						<EndHour control={control} setValue={setValue} watch={watch} />
					</div>
				</ModalRow>
				<ModalRow icon='MdRepeat'>
					<Repeat control={control} />
				</ModalRow>
				<ModalRow icon='MdDescription'>
					<Description row={4} control={control} />
				</ModalRow>
				<ModalRow icon='MdPeople'>
					<Guests control={control} />
				</ModalRow>
				<div className={mainStyles.footer}>
					<button className='primaryBtn' type='submit'>
						Save
					</button>
				</div>
			</form>
			{event.groupId && (
				<ConfirmEventUpdate
					closeMainModal={onClose}
					groupId={event.groupId}
					id={event.id}
				/>
			)}
		</>
	)
})

export default EventEdit
