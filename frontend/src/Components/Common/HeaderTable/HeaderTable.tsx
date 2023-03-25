import { FC } from 'react'
import { Link } from 'react-router-dom'

import { getCurrentDate } from '@/utils/date/getCurrentDate'

import styles from './HeaderTable.module.scss'

interface IHeaderTable {
	date: string
	link: string
}

const HeaderTable: FC<IHeaderTable> = ({ date, link }) => {
	const [numeric, dayOfWeek] = date.split(' ')
	const { day, month, year } = getCurrentDate()
	const isCurrentDate =
		link.split('/').slice(2).join(' ') === `${year} ${month} ${day}`
	return (
		<th className={styles.header}>
			<div>
				<span>{dayOfWeek}</span>
				<Link to={link} className={isCurrentDate ? styles.currentDate : ''}>
					{numeric}
				</Link>
			</div>
			<div></div>
		</th>
	)
}

export default HeaderTable
