import moment from 'moment'
import { FC, MouseEvent, useRef } from 'react'

import { ITask } from '@shared/types/task'

import { countDayPosition } from '@utils/countDayPosition'
import { countWeekPosition } from '@utils/countWeekPosition'

import modals from '@store/Modals'
import pickedDate from '@store/PickedDate'

import MaterialIcon from '@common/Icon'
import mainStyles from '../Activity.module.scss'


const Task: FC<{ task: ITask; countActivity: number }> = ({ task, countActivity }) => {
	const time = moment.unix(task.time).format('h a')
	const ref = useRef<HTMLLIElement | null>(null)
	const { timeZone } = pickedDate
	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation()
		switch (timeZone) {
			case 'day':
				modals.toggleTaskModal(task, countDayPosition(ref))
				break
			case 'week':
				modals.toggleTaskModal(task, countWeekPosition(ref))
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
				height: '22px',
				background: 'var(--green)',
			}}
			onClick={handleClick}
			className={mainStyles.activity}
		>
			<MaterialIcon color='white' name='MdTaskAlt' size={14} />
			<span className={task.completed ? mainStyles.completed : ''}>
				{task.title}, {time}
			</span>
		</li>
	)
}

export default Task
