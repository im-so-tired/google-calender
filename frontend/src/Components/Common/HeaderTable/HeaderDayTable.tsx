import cn from 'classnames'
import { Moment } from 'moment'
import { FC } from 'react'

import { getCurrentDate } from '@/utils/date/getCurrentDate'

import styles from './HeaderTable.module.scss'

interface IHeaderTable {
	date: Moment
}

const HeaderDayTable: FC<IHeaderTable> = ({ date }) => {
	const [numeric, dayOfWeek] = date.locale('EN').format('D ddd').split(' ')
	const { day, month, year } = getCurrentDate()
	const isCurrentDate = date.format('YYYY M D') === `${year} ${month} ${day}`
	return (
		<th className={styles.header}>
			<div className={styles.dayContent}>
				<div style={{ display: 'inline-block' }}>
					<span>{dayOfWeek}</span>
					<div
						className={cn(styles.numeric, {
							[styles.currentDate]: isCurrentDate,
						})}
					>
						{numeric}
					</div>
				</div>
			</div>
			<div></div>
		</th>
	)
}

export default HeaderDayTable
