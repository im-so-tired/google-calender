import { Moment } from 'moment'
import { FC } from 'react'

import { useCell } from '@/ui/Tables/Cell/useCell'
import Event from '@/ui/Tables/Event/Event'
import Reminder from '@/ui/Tables/Reminders/Reminders'
import Task from '@/ui/Tables/Task/Task'

import { IEvent } from '@/shared/types/IEvent'
import { IReminder } from '@/shared/types/IReminder'
import { ITask } from '@/shared/types/ITask'

import modals from '@/store/Modals'

import styles from './Cell.module.scss'

export interface CellProps {
	date: Moment
	tasks: ITask[]
	reminders: IReminder[]
	events: IEvent[]
}

const Cell: FC<CellProps> = ({ date, ...rest }) => {
	const {
		countActivity,
		approachEvents,
		approachReminders,
		approachTasks,
		maxWidth,
	} = useCell({ ...rest, date })
	return (
		<td
			style={{ maxWidth: `${maxWidth / 7}px` }}
			onClick={() => modals.toggleCreateModal(date)}
		>
			<ul className={styles.list}>
				{approachTasks.map(task => (
					<Task
						countActivity={countActivity}
						key={`task${task.id}`}
						task={task}
					/>
				))}
				{approachEvents.map(event => (
					<Event
						event={event}
						countActivity={countActivity}
						key={`event${event.id}`}
					/>
				))}
				{approachReminders.map(reminder => (
					<Reminder
						countActivity={countActivity}
						key={`reminder${reminder.id}`}
						reminder={reminder}
					/>
				))}
			</ul>
		</td>
	)
}

export default Cell
