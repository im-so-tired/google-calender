import moment, { Moment } from 'moment'
import { FC } from 'react'

import Task from '@/ui/Tables/Task/Task'

import { ITask } from '@/shared/types/ITask'

import modals from '@/store/Modals'

import styles from './Cell.module.scss'

const Cell: FC<{ date: Moment; tasks: ITask[] }> = ({ date, tasks }) => {
	const approachTasks = tasks.filter(
		el =>
			+el.time >= moment(date).unix() &&
			+el.time < moment(date).add(1, 'h').unix()
	)
	return (
		<td onClick={() => modals.toggleCreateModal(date)}>
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
