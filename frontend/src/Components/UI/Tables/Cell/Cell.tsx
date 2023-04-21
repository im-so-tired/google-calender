import moment, { Moment } from 'moment'
import { FC } from 'react'

import { useLayoutContext } from '@/ui/Layout/useLayoutContext'
import Task from '@/ui/Tables/Task/Task'

import { ITask } from '@/shared/types/ITask'

import modals from '@/store/Modals'

import styles from './Cell.module.scss'

interface CellProps {
	date: Moment
	tasks: ITask[]
}

const Cell: FC<CellProps> = ({ date, tasks }) => {
	const { showSidebar } = useLayoutContext()
	const approachTasks = tasks.filter(
		el =>
			+el.time >= moment(date).unix() &&
			+el.time < moment(date).add(1, 'h').unix()
	)
	let maxWidth = window.innerWidth - 56 - 16
	if (showSidebar) maxWidth -= 256
	return (
		<td
			style={{ maxWidth: `${maxWidth / 7}px` }}
			onClick={() => modals.toggleCreateModal(date)}
		>
			<ul className={styles.list}>
				{approachTasks.map(el => (
					<Task
						countTasks={approachTasks.length}
						key={`task${el.id}`}
						task={el}
					/>
				))}
			</ul>
		</td>
	)
}

export default Cell
