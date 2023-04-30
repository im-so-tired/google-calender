import moment from 'moment'
import { FC, MouseEvent, useRef } from 'react'

import { IEvent } from '@shared/types/event'

import { countDayPosition } from '@utils/countDayPosition'
import { countWeekPosition } from '@utils/countWeekPosition'

import modals from '@store/Modals'
import pickedDate from '@store/PickedDate'

import mainStyles from '../Activity.module.scss'


const Event: FC<{ event: IEvent; countActivity: number }> = ({ event, countActivity }) => {
	const startTime = moment.unix(event.startTime).format('ha')
	const endTime = moment.unix(event.endTime).format('ha')
	const ref = useRef<HTMLLIElement | null>(null)
	const { timeZone } = pickedDate
	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation()
		switch (timeZone) {
			case 'day':
				modals.toggleEventModal(event, countDayPosition(ref))
				break
			case 'week':
				modals.toggleEventModal(event, countWeekPosition(ref))
				break
			default:
		}
	}
	return (
		<li
			ref={ref}
			draggable
			style={{
				width: `${(1 / countActivity) * 100}%`,
				boxSizing: 'border-box',
				background: 'var(--yellow)',
				height: 'calc(100% - 5px)',
			}}
			onClick={handleClick}
			className={mainStyles.activity}
		>
			<div>
				<h6>{event.title}</h6>
				<span>
					{startTime} - {endTime}
				</span>
			</div>
		</li>
	)
}

export default Event
