import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { Moment } from 'moment'
import { FC } from 'react'

import Cell from '@ui/Tables/Cell/Cell'
import { useTable } from '@ui/Tables/useTable'

import event from '@store/Event'
import pickedDate from '@store/PickedDate'
import reminder from '@store/Reminder'
import task from '@store/Task'

import mainStyles from '../Table.module.scss'

import HeaderDayTable from '@common/HeaderTable/HeaderDayTable'

const DayTable: FC = observer(() => {
	const { tasks } = task
	const { events } = event
	const { reminders } = reminder
	const { date } = pickedDate
	const tableArray: Moment[] = Array.from(Array(24), (_, i) =>
		moment(date).hour(i).startOf('hour'),
	)
	useTable()
	return (
		<table className={cn(mainStyles.table)}>
			<thead>
			<tr>
				<HeaderDayTable date={date} />
			</tr>
			</thead>
			<tbody>
			{tableArray.map((value, rowIdx) => (
				<tr
					data-hour={moment().hour(rowIdx).format('h a')}
					key={value.toString()}
				>
					<Cell
						countDay={1}
						events={events}
						reminders={reminders}
						tasks={tasks}
						date={value}
					/>
				</tr>
			))}
			</tbody>
		</table>
	)
})

export default DayTable
