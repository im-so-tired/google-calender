import moment from 'moment'
import { FC } from 'react'

import styles from './Time.module.scss'

const Time: FC<{ time: number }> = ({ time }) => {
	const date = moment.unix(time).format('dddd, D MMMM')
	const hour = moment.unix(time).format('h a')
	return (
		<div>
			<span className={styles.date}>{date}</span>
			<span className={styles.hour}>{hour}</span>
		</div>
	)
}

export default Time
