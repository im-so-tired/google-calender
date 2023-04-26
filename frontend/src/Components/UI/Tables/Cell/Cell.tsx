import { Moment } from 'moment'
import { FC } from 'react'

import Event from '@/ui/Tables/Activity/Event'
import Reminder from '@/ui/Tables/Activity/Reminders'
import Task from '@/ui/Tables/Activity/Task'
import { useCell } from '@/ui/Tables/Cell/useCell'

import { IEvent } from '@/shared/types/event'
import { IReminder } from '@/shared/types/reminder'
import { ITask } from '@/shared/types/task'

import modals from '@/store/Modals'

import styles from './Cell.module.scss'

export interface CellProps {
	date: Moment
	tasks: ITask[]
	reminders: IReminder[]
	events: IEvent[]
	countDay: number
}

const Cell: FC<CellProps> = ({ date, countDay, ...rest }) => {
	const {
		countActivity,
		approachEvents,
		approachReminders,
		approachTasks,
		maxWidth,
	} = useCell({ ...rest, date })
	return (
		<td
			style={{ maxWidth: `${maxWidth / countDay}px` }}
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
						countActivity={countActivity}
						key={`event${event.id}`}
						event={event}
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
