import moment from 'moment'
import { FC, useRef } from 'react'

import { IEvent } from '@/shared/types/IEvent'

import mainStyles from '../Activity.module.scss'

const Event: FC<{ event: IEvent; countActivity: number }> = ({
	event,
	countActivity,
}) => {
	const startTime = moment.unix(event.startTime).format('ha')
	const endTime = moment.unix(event.endTime).format('ha')
	const ref = useRef<HTMLLIElement | null>(null)

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
