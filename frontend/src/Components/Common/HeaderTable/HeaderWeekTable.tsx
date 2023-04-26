import cn from 'classnames'
import { Moment } from 'moment'
import { FC } from 'react'

import { getCurrentDate } from '@/utils/date/getCurrentDate'

import pickedDate from '@/store/PickedDate'

import styles from './HeaderTable.module.scss'

interface IHeaderTable {
	date: Moment
}

const HeaderWeekTable: FC<IHeaderTable> = ({ date }) => {
	const [numeric, dayOfWeek] = date.locale('EN').format('D ddd').split(' ')
	const { day, month, year } = getCurrentDate()
	const isCurrentDate = date.format('YYYY M D') === `${year} ${month} ${day}`
	return (
		<th className={styles.header}>
			<div className={styles.weekContent}>
				<span>{dayOfWeek}</span>
				<button
					onClick={() => {
						pickedDate.setTimeZone('day')
						pickedDate.setDate(date)
					}}
					className={cn(styles.numeric, {
						[styles.currentDate]: isCurrentDate,
					})}
				>
					{numeric}
				</button>
			</div>
			<div></div>
		</th>
	)
}

export default HeaderWeekTable
