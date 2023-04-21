import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'

import confirmModal from '@/store/ConfirmModal'
import modals from '@/store/Modals'
import task from '@/store/Task'

import mainStyles from '../CrudModal.module.scss'

import styles from './TaskModal.module.scss'
import Heading from '@/common/ActivityInfo/Heading/Heading'
import Time from '@/common/ActivityInfo/Time/Time'
import ActivityModal from '@/common/Modals/ActivityModal/ActivityModal'
import { IBaseModal } from '@/common/Modals/BaseModal/BaseModal'
import ConfirmTaskDelete from '@/common/Modals/ConfirmModals/Delete/ConfirmTaskDelete'
import ModalRow from '@/common/Modals/ModalRow'
import TaskEdit from '@/common/Modals/TaskModal/TaskEdit'

interface ITaskModal extends IBaseModal {}

const TaskModal: FC<ITaskModal> = observer(props => {
	const [isEdit, setIsEdit] = useState(false)
	const { onClose } = props
	const { taskModal } = modals
	const { task: taskInfo } = taskModal
	if (!taskInfo) return null

	const onDelete = () => {
		if (!taskInfo.groupId) {
			task.deleteTask(taskInfo.id)
			onClose()
		} else {
			confirmModal.toggleDeleteTask()
		}
	}
	const reset = () => {
		onClose()
		setIsEdit(false)
	}
	const onEdit = () => {
		setIsEdit(true)
	}

	const completeHandler = () => {
		task.changeComplete(taskInfo.id)
		onClose()
	}
	return (
		<ActivityModal
			{...props}
			deleteHandler={onDelete}
			editHandler={onEdit}
			isEdit={isEdit}
			setIsEdit={setIsEdit}
			bgDark={isEdit}
			position={{ ...taskModal.position }}
		>
			{isEdit ? (
				<TaskEdit onClose={reset} />
			) : (
				<>
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
				</>
			)}
			{taskInfo.groupId && (
				<ConfirmTaskDelete
					id={taskInfo.id}
					groupId={taskInfo.groupId}
					closeMainModal={reset}
				/>
			)}
		</ActivityModal>
	)
})

export default TaskModal
