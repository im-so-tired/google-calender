import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { IConfirmModal } from '@shared/types/modals'

import confirmModal from '@store/ConfirmModal'
import task from '@store/Task'

import BaseModal from '@common/Modals/BaseModal/BaseModal'
import { useConfirm } from '@common/Modals/ConfirmModals/useConfirm'
import styles from '../ConfirmModal.module.scss'
import Footer from '../Footer'


const ConfirmTaskUpdate: FC<IConfirmModal> = observer(
	({ id, groupId, closeMainModal }) => {
		const { toggleUpdateTask, confirmUpdateTask } = confirmModal
		const { newValue, activityId: taskId } = confirmUpdateTask
		const { value, handleChange } = useConfirm()
		const handleConfirm = () => {
			if (!newValue || !taskId) return
			if (value === 'one') {
				task.update(id, newValue)
			} else {
				task.groupUpdate(groupId, taskId, newValue)
			}
			toggleUpdateTask()
			closeMainModal()
		}
		return (
			<BaseModal open={confirmUpdateTask.open} onClose={toggleUpdateTask}>
				<div className={styles.cnfModal}>
					<h2>Save repeating task</h2>
					<RadioGroup
						aria-labelledby='demo-controlled-radio-buttons-group'
						name='controlled-radio-buttons-group'
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value='one'
							control={<Radio />}
							label='This task'
						/>
						<FormControlLabel
							value='all'
							control={<Radio />}
							label='All tasks'
						/>
					</RadioGroup>
					<Footer confirm={handleConfirm} cancel={toggleUpdateTask} />
				</div>
			</BaseModal>
		)
	},
)

export default ConfirmTaskUpdate
