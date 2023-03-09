import cn from 'classnames'
import moment from 'moment'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { IParams } from '@/shared/types/params'

import mainStyles from '../Table.module.scss'

import styles from './WeekTable.module.scss'
import HeaderTable from '@/common/HeaderTable/HeaderTable'

const WeekTable: FC = () => {
	const { month, day, year } = useParams<IParams>()

	const emptyArray = new Array(7).fill(0)
	const headArray = emptyArray.map((_, i) => {
		const date = moment(`${day} ${month} ${year}`, 'DD MM YYYY')
			.locale('RU')
			.weekday(i)
		return {
			date: date.locale('EN').format('D ddd'),
			link: `/day/${date.format('YYYY/M/D')}`,
		}
	})
	return (
		<table className={cn(mainStyles.table)}>
			<thead>
				<tr>
					{headArray.map(item => (
						<HeaderTable key={item.link} date={item.date} link={item.link} />
					))}
				</tr>
				<tr></tr>
			</thead>
			<tbody></tbody>
		</table>
	)
}

export default WeekTable
