import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import React, { FC } from 'react'

import { useEvent } from '@/hooks/useEvent'

import { repeatOption } from '@/shared/constants/repeatOption'

import styles from './CreateModal.module.scss'
import MaterialIcon from '@/common/Icon'
import {
	endTimeOption,
	startTimeOption,
} from '@/common/Modals/CreateModal/Helpers/createOptions'
import CustomSelect from '@/common/Select/CustomSelect'

const dateFormat = 'DD/MM/YYYY'
const Event: FC = () => {
	const event = useEvent()
	return (
		<>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdAccessTime" />
				</div>
				<div className={styles.time}>
					<DatePicker
						className={styles.datePicker}
						onChange={event.changeDay}
						value={event.day}
						inputFormat={dateFormat}
						renderInput={params => <TextField {...params} />}
					/>
					<CustomSelect
						value={event.startHour}
						className={styles.customSelect}
						onChange={event.changeStartHour}
						options={startTimeOption}
						classNamePrefix="primary-select"
					/>
					<span>-</span>
					<CustomSelect
						value={event.endHour}
						onChange={event.changeEndHour}
						options={endTimeOption}
						classNamePrefix="primary-select"
					/>
				</div>
			</div>
			<div className={styles.flexComp}>
				<div />
				<CustomSelect
					value={event.repeat}
					onChange={event.changeRepeat}
					options={repeatOption}
					classNamePrefix="custom-select"
					className={styles.repeatSelect}
				/>
			</div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdPeople" />
				</div>
				<input
					className="modalTextField"
					placeholder="Add guests"
					value={event.guests}
					onChange={event.changeGuests}
				/>
			</div>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdDescription" />
				</div>
				<div>
					<textarea
						className="modalTextField"
						value={event.description}
						onChange={event.changeDescription}
						rows={2}
					/>
				</div>
			</div>
		</>
	)
}

export default Event
