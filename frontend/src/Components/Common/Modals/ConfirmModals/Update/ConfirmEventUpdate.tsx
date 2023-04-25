import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { IConfirmModal } from '@/shared/types/modals'

import confirmModal from '@/store/ConfirmModal'
import event from '@/store/Event'

import styles from '../ConfirmModal.module.scss'
import Footer from '../Footer'

import BaseModal from '@/common/Modals/BaseModal/BaseModal'
import { useConfirm } from '@/common/Modals/ConfirmModals/useConfirm'

const ConfirmEventUpdate: FC<IConfirmModal> = observer(
	({ id, groupId, closeMainModal }) => {
		const { toggleUpdateEvent, confirmUpdateEvent } = confirmModal
		const { newValue, activityId: eventId, open } = confirmUpdateEvent
		const { value, handleChange } = useConfirm()
		const handleConfirm = () => {
			if (!newValue || !eventId) return
			if (value === 'one') {
				event.update(id, newValue)
			} else {
				event.groupUpdate(groupId, eventId, newValue)
			}
			toggleUpdateEvent()
			closeMainModal()
		}
		return (
			<BaseModal open={open} onClose={toggleUpdateEvent}>
				<div className={styles.cnfModal}>
					<h2>Edit recurring event</h2>
					<RadioGroup
						aria-labelledby="demo-controlled-radio-buttons-group"
						name="controlled-radio-buttons-group"
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value="one"
							control={<Radio />}
							label="This event"
						/>
						<FormControlLabel
							value="all"
							control={<Radio />}
							label="All events"
						/>
					</RadioGroup>
					<Footer confirm={handleConfirm} cancel={toggleUpdateEvent} />
				</div>
			</BaseModal>
		)
	}
)

export default ConfirmEventUpdate
