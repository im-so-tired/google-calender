import moment from 'moment'
import { FC, useRef } from 'react'

import { IReminder } from '@/shared/types/IReminder'
import { ITask } from '@/shared/types/ITask'

import modals from '@/store/Modals'

import mainStyles from '../Activity.module.scss'

import MaterialIcon from '@/common/Icon'

const Reminder: FC<{ reminder: IReminder; countActivity: number }> = ({
	reminder,
	countActivity,
}) => {
	const time = moment.unix(reminder.time).format('h a')
	const ref = useRef<HTMLLIElement | null>(null)
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
		>
			<MaterialIcon color="white" name="MdTimer" size={14} />
			<span>
				{reminder.title}, {time}
			</span>
		</li>
	)
}

export default Reminder
