import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { FC, useEffect } from 'react'

import Cell from '@/ui/Tables/Cell/Cell'
import { useTable } from '@/ui/Tables/useTable'

import task from '@/store/Task'

import mainStyles from '../Table.module.scss'

import styles from './WeekTable.module.scss'
import { useWeekTable } from './useWeekTable'
import HeaderTable from '@/common/HeaderTable/HeaderTable'

const WeekTable: FC = observer(() => {
	const { tableArray, tableHead } = useWeekTable()
	const { tasks } = task
	useTable()
	return (
		<table className={cn(mainStyles.table, styles.weekTable)}>
			<thead>
				<tr>
					{tableHead.map(date => (
						<HeaderTable key={date.toString()} date={date} />
					))}
				</tr>
			</thead>
			<tbody>
				{tableArray.map((row, rowIdx) => (
					<tr data-hour={moment().hour(rowIdx).format('h a')} key={rowIdx}>
						{row.map(day => (
							<Cell tasks={tasks} key={day.toString()} date={day} />
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
})

export default WeekTable
