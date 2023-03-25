import cn from 'classnames'
import { FC } from 'react'

import Cell from '@/ui/Tables/WeekTable/Cell'
import { useWeekTable } from '@/ui/Tables/useTable'

import mainStyles from '../Table.module.scss'

import styles from './WeekTable.module.scss'
import HeaderTable from '@/common/HeaderTable/HeaderTable'

const WeekTable: FC = () => {
	const { tableArray, tableHead } = useWeekTable()
	return (
		<table className={cn(mainStyles.table)}>
			<thead>
				<tr>
					{tableHead.map(item => (
						<HeaderTable key={item.link} date={item.date} link={item.link} />
					))}
				</tr>
			</thead>
			<tbody>
				{tableArray.map((row, rowIdx) => (
					<tr key={rowIdx}>
						{row.map(day => (
							<Cell key={day.toString()} date={day} />
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default WeekTable
