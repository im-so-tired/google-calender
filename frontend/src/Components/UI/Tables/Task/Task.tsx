import moment from 'moment'
import { FC, MouseEvent, useRef } from 'react'

import { ITask } from '@/shared/types/ITask'

import modals from '@/store/Modals'

import styles from './Task.module.scss'
import MaterialIcon from '@/common/Icon'

const Task: FC<{ task: ITask; countTasks: number }> = ({
	task,
	countTasks,
}) => {
	const time = moment.unix(task.time).format('h a')
	const ref = useRef<HTMLLIElement | null>(null)
	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation()
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()
		const halfWindowWidth = window.innerWidth / 2
		const halfWindowHeight = window.innerHeight / 2
		if (rect.left < halfWindowWidth) {
			if (rect.top < halfWindowHeight) {
				modals.toggleTaskModal(task, {
					top: `${rect.top}px`,
					left: `${rect.right}px`,
					right: 'auto',
					bottom: 'auto',
				})
			} else {
				modals.toggleTaskModal(task, {
					top: 'auto',
					left: `${rect.right}px`,
					right: 'auto',
					bottom: `${window.innerHeight - rect.bottom}px`,
				})
			}
		} else if (rect.top < halfWindowHeight) {
			modals.toggleTaskModal(task, {
				top: `${rect.top}px`,
				left: 'auto',
				right: `${window.innerWidth - rect.left}px`,
				bottom: 'auto',
			})
		} else {
			modals.toggleTaskModal(task, {
				top: 'auto',
				left: 'auto',
				right: `${window.innerWidth - rect.left}px`,
				bottom: `${window.innerHeight - rect.bottom}px`,
			})
		}
	}

	return (
		<li
			ref={ref}
			draggable
			style={{ width: `${(1 / countTasks) * 100}%`, boxSizing: 'border-box' }}
			onClick={handleClick}
			className={styles.task}
		>
			<MaterialIcon color="white" name="MdTaskAlt" size={14} />
			<span className={task.completed ? styles.completed : ''}>
				{task.title}, {time}
			</span>
		</li>
	)
}

export default Task
