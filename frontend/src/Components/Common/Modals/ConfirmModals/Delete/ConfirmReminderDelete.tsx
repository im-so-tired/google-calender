import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { IConfirmModal } from '@/shared/types/modals'

import confirmModal from '@/store/ConfirmModal'
import reminder from '@/store/Reminder'

import Footer from '../Footer'

import BaseModal from '@/common/Modals/BaseModal/BaseModal'
import styles from '@/common/Modals/ConfirmModals/ConfirmModal.module.scss'
import { useConfirm } from '@/common/Modals/ConfirmModals/useConfirm'

const ConfirmReminderDelete: FC<IConfirmModal> = observer(
	({ id, groupId, closeMainModal }) => {
		const { toggleDeleteReminder, confirmDeleteReminder } = confirmModal
		const { value, handleChange } = useConfirm()
		const handleConfirm = () => {
			if (value === 'one') {
				reminder.delete(id)
			} else {
				reminder.deleteGroup(groupId)
			}
			toggleDeleteReminder()
			closeMainModal()
		}
		return (
			<BaseModal open={confirmDeleteReminder} onClose={toggleDeleteReminder}>
				<div className={styles.cnfModal}>
					<h2>Delete recurring reminder</h2>
					<RadioGroup
						aria-labelledby="demo-controlled-radio-buttons-group"
						name="controlled-radio-buttons-group"
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value="one"
							control={<Radio />}
							label="This reminder"
						/>
						<FormControlLabel
							value="all"
							control={<Radio />}
							label="This and following reminders"
						/>
					</RadioGroup>
					<Footer confirm={handleConfirm} cancel={toggleDeleteReminder} />
				</div>
			</BaseModal>
		)
	}
)

export default ConfirmReminderDelete
