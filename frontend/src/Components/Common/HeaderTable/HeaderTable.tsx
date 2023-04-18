import { Moment } from 'moment'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { getCurrentDate } from '@/utils/date/getCurrentDate'

import pickedDate from '@/store/PickedDate'

import styles from './HeaderTable.module.scss'

interface IHeaderTable {
	date: Moment
}

const HeaderTable: FC<IHeaderTable> = ({ date }) => {
	const [numeric, dayOfWeek] = date.locale('EN').format('D ddd').split(' ')
	const { day, month, year } = getCurrentDate()
	const isCurrentDate = date.format('YYYY M D') === `${year} ${month} ${day}`
	return (
		<th className={styles.header}>
			<div>
				<span>{dayOfWeek}</span>
				<button
					onClick={() => {
						pickedDate.setTimeZone('day')
						pickedDate.setDate(date)
					}}
					className={isCurrentDate ? styles.currentDate : ''}
				>
					{numeric}
				</button>
			</div>
			<div></div>
		</th>
	)
}

export default HeaderTable
