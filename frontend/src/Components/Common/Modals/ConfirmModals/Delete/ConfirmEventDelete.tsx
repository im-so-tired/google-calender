import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { IConfirmModal } from '@shared/types/modals'

import confirmModal from '@store/ConfirmModal'
import event from '@store/Event'

import BaseModal from '@common/Modals/BaseModal/BaseModal'
import styles from '@common/Modals/ConfirmModals/ConfirmModal.module.scss'
import { useConfirm } from '@common/Modals/ConfirmModals/useConfirm'
import Footer from '../Footer'

const ConfirmEventDelete: FC<IConfirmModal> = observer(
	({ id, groupId, closeMainModal }) => {
		const { toggleDeleteEvent, confirmDeleteEvent } = confirmModal
		const { value, handleChange } = useConfirm()
		const handleConfirm = () => {
			if (value === 'one') {
				event.delete(id)
			} else {
				event.deleteGroup(groupId)
			}
			toggleDeleteEvent()
			closeMainModal()
		}
		return (
			<BaseModal open={confirmDeleteEvent} onClose={toggleDeleteEvent}>
				<div className={styles.cnfModal}>
					<h2>Delete recurring event</h2>
					<RadioGroup
						aria-labelledby='demo-controlled-radio-buttons-group'
						name='controlled-radio-buttons-group'
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value='one'
							control={<Radio />}
							label='This event'
						/>
						<FormControlLabel
							value='all'
							control={<Radio />}
							label='All events'
						/>
					</RadioGroup>
					<Footer confirm={handleConfirm} cancel={toggleDeleteEvent} />
				</div>
			</BaseModal>
		)
	},
)

export default ConfirmEventDelete
