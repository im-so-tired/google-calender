import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { IConfirmModal } from '@/shared/types/modals'

import confirmModal from '@/store/ConfirmModal'
import reminder from '@/store/Reminder'

import styles from '../ConfirmModal.module.scss'
import Footer from '../Footer'

import BaseModal from '@/common/Modals/BaseModal/BaseModal'
import { useConfirm } from '@/common/Modals/ConfirmModals/useConfirm'

const ConfirmReminderUpdate: FC<IConfirmModal> = observer(
	({ id, groupId, closeMainModal }) => {
		const { toggleUpdateReminder, confirmUpdateReminder } = confirmModal
		const { newValue, activityId: reminderId, open } = confirmUpdateReminder
		const { value, handleChange } = useConfirm()
		const handleConfirm = () => {
			if (!newValue || !reminderId) return
			if (value === 'one') {
				reminder.update(id, newValue)
			} else {
				reminder.groupUpdate(groupId, reminderId, newValue)
			}
			toggleUpdateReminder()
			closeMainModal()
		}
		return (
			<BaseModal open={open} onClose={toggleUpdateReminder}>
				<div className={styles.cnfModal}>
					<h2>Edit recurring reminder</h2>
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
					<Footer confirm={handleConfirm} cancel={toggleUpdateReminder} />
				</div>
			</BaseModal>
		)
	}
)

export default ConfirmReminderUpdate
