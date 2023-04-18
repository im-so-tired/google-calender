import moment from 'moment'
import { FC, MouseEvent } from 'react'

import { ITask } from '@/shared/types/ITask'

import styles from './Task.module.scss'
import MaterialIcon from '@/common/Icon'

const Task: FC<{ task: ITask; countTasks: number }> = ({
	task,
	countTasks,
}) => {
	const time = moment.unix(task.time).format('h a')

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation()
	}

	return (
		<li
			draggable
			style={{ width: `${(1 / countTasks) * 100}%`, boxSizing: 'border-box' }}
			onClick={handleClick}
			className={styles.task}
		>
			<MaterialIcon color="white" name="MdTaskAlt" size={14} />
			<span>
				{task.title}, {time}
			</span>
		</li>
	)
}

export default Task
