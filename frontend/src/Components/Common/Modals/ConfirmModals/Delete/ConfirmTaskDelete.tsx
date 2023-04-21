import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { IConfirmModal } from '@/shared/types/modals'

import confirmModal from '@/store/ConfirmModal'
import task from '@/store/Task'

import BaseModal from '@/common/Modals/BaseModal/BaseModal'
import styles from '@/common/Modals/ConfirmModals/ConfirmModal.module.scss'
import { useConfirm } from '@/common/Modals/ConfirmModals/useConfirm'

const ConfirmTaskDelete: FC<IConfirmModal> = observer(
	({ id, groupId, closeMainModal }) => {
		const { toggleDeleteTask, confirmDeleteTask } = confirmModal
		const { value, handleChange } = useConfirm()
		const handleConfirm = () => {
			if (value === 'one') {
				task.deleteTask(id)
			} else {
				task.deleteGroup(groupId)
			}
			toggleDeleteTask()
			closeMainModal()
		}
		return (
			<BaseModal open={confirmDeleteTask} onClose={toggleDeleteTask}>
				<div className={styles.cnfModal}>
					<h2>Delete repeating task</h2>
					<RadioGroup
						aria-labelledby="demo-controlled-radio-buttons-group"
						name="controlled-radio-buttons-group"
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value="one"
							control={<Radio />}
							label="This task"
						/>
						<FormControlLabel
							value="all"
							control={<Radio />}
							label="All tasks"
						/>
					</RadioGroup>
					<div className={styles.footer}>
						<button
							onClick={() => toggleDeleteTask()}
							className={styles.cancelBtn}
						>
							Cancel
						</button>
						<button onClick={handleConfirm} className={styles.okBtn}>
							OK
						</button>
					</div>
				</div>
			</BaseModal>
		)
	}
)

export default ConfirmTaskDelete
