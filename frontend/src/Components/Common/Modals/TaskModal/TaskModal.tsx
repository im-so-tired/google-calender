import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'

import modals from '@/store/Modals'
import task from '@/store/Task'

import mainStyles from '../CrudModal.module.scss'

import styles from './TaskModal.module.scss'
import Heading from '@/common/ActivityInfo/Heading/Heading'
import Time from '@/common/ActivityInfo/Time/Time'
import ActivityModal from '@/common/Modals/ActivityModal/ActivityModal'
import { IBaseModal } from '@/common/Modals/BaseModal/BaseModal'
import ModalRow from '@/common/Modals/ModalRow'

interface ITaskModal extends IBaseModal {}

const TaskModal: FC<ITaskModal> = observer(props => {
	const [isEdit, setIsEdit] = useState(false)
	const { taskModal } = modals
	const { task: taskInfo } = taskModal
	if (!taskInfo) return null

	const onDelete = () => {
		if (!taskInfo.groupId) {
			task.deleteTask(taskInfo.id)
		}
		props.onClose()
	}

	const onEdit = () => {
		setIsEdit(true)
	}

	const completeHandler = () => {
		task.changeComplete(taskInfo.id)
		props.onClose()
	}
	return (
		<ActivityModal
			{...props}
			deleteHandler={onDelete}
			editHandler={onEdit}
			isEdit={isEdit}
			bgDark={isEdit}
			position={{ ...taskModal.position }}
		>
			<ModalRow>
				<Heading title={taskInfo.title} />
			</ModalRow>
			<ModalRow icon="MdAccessTime">
				<Time time={taskInfo.time} />
			</ModalRow>
			{taskInfo.description && (
				<ModalRow icon="MdDescription">
					<p>{taskInfo.description}</p>
				</ModalRow>
			)}
			<footer className={styles.footer}>
				<button onClick={completeHandler}>
					{taskInfo.completed ? 'Mark uncompleted' : 'Mark completed'}
				</button>
			</footer>
		</ActivityModal>
	)
})

export default TaskModal
