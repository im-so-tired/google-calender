import moment from 'moment'
import { FC, MouseEvent, useRef } from 'react'

import { IReminder } from '@/shared/types/reminder'
import { ITask } from '@/shared/types/task'

import { countPosition } from '@/utils/countPosition'

import modals from '@/store/Modals'

import mainStyles from '../Activity.module.scss'

import MaterialIcon from '@/common/Icon'

const Reminder: FC<{ reminder: IReminder; countActivity: number }> = ({
	reminder,
	countActivity,
}) => {
	const time = moment.unix(reminder.time).format('h a')
	const ref = useRef<HTMLLIElement | null>(null)

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation()
		modals.toggleReminderModal(reminder, countPosition(ref))
	}
	return (
		<li
			ref={ref}
			draggable
			style={{
				width: `${(1 / countActivity) * 100}%`,
				boxSizing: 'border-box',
				height: '22px',
				background: 'var(--primary)',
			}}
			className={mainStyles.activity}
			onClick={handleClick}
		>
			<MaterialIcon color="white" name="MdTimer" size={14} />
			<span>
				{reminder.title}, {time}
			</span>
		</li>
	)
}

export default Reminder
