import moment from 'moment'
import { FC, MouseEvent, useRef } from 'react'

import { IReminder } from '@shared/types/reminder'

import { countDayPosition } from '@utils/countDayPosition'
import { countWeekPosition } from '@utils/countWeekPosition'

import modals from '@store/Modals'
import pickedDate from '@store/PickedDate'

import MaterialIcon from '@common/Icon'
import mainStyles from '../Activity.module.scss'


const Reminder: FC<{ reminder: IReminder; countActivity: number }> = ({ reminder, countActivity }) => {
	const time = moment.unix(reminder.time).format('h a')
	const ref = useRef<HTMLLIElement | null>(null)
	const { timeZone } = pickedDate
	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation()
		switch (timeZone) {
			case 'day':
				modals.toggleReminderModal(reminder, countDayPosition(ref))
				break
			case 'week':
				modals.toggleReminderModal(reminder, countWeekPosition(ref))
				break
			default:
		}
	}

	return (
		<li
			ref={ref}
			draggable
			style={{
				width: `${(1 / countActivity) * 100}%`, boxSizing: 'border-box', height: '22px', background: 'var(--primary)',
			}}
			className={mainStyles.activity}
			onClick={handleClick}
		>
			<MaterialIcon color='white' name='MdTimer' size={14} />
			<span>
        {reminder.title}
				,
				{time}
      </span>
		</li>
	)
}

export default Reminder
