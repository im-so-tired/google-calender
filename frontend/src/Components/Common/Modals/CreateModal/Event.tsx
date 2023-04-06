import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { SingleValue } from 'react-select'

import { repeatOption } from '@/shared/constants/repeatOption'
import { IOption } from '@/shared/types/SelectOpt'
import { RepeatType } from '@/shared/types/repeatType'

import styles from './CreateModal.module.scss'
import MaterialIcon from '@/common/Icon'
import {
	endTimeOption,
	startTimeOption,
} from '@/common/Modals/CreateModal/Helpers/createOptions'
import CustomSelect from '@/common/Select/CustomSelect'

const dateFormat = 'DD/MM/YYYY'
const Event: FC = () => {
	const [day, setDay] = useState<Moment | null>()
	const [startHour, setStartHour] = useState<number>(moment().hour())
	const [endHour, setEndHour] = useState<number>(moment().hour() + 1)
	const [repeat, setRepeat] = useState<RepeatType>('no-repeat')
	const handleChange = (newDate: Moment | null) => {
		if (!newDate) return
		setDay(newDate)
	}

	const changeRepeat = (newOption: SingleValue<IOption<RepeatType>>) => {
		const newValue = (newOption as IOption<RepeatType>).value
		setRepeat(newValue)
	}
	const changeStartHour = (newOption: SingleValue<IOption<number>>) => {
		const newValue = (newOption as IOption<number>).value
		setStartHour(newValue)
		if (newValue >= endHour) {
			setEndHour(newValue + 1)
		}
	}

	const changeEndHour = (newOption: SingleValue<IOption<number>>) => {
		const newValue = (newOption as IOption<number>).value
		setEndHour(newValue)
		if (newValue <= startHour) {
			setStartHour(newValue - 1)
		}
	}
	return (
		<>
			<div className={styles.flexComp}>
				<div>
					<MaterialIcon name="MdAccessTime" />
				</div>
				<div className={styles.time}>
					<DatePicker
						className={styles.datePicker}
						onChange={handleChange}
						value={day}
						inputFormat={dateFormat}
						renderInput={params => <TextField {...params} />}
					/>
					<CustomSelect
						value={startHour}
						className={styles.customSelect}
						onChange={changeStartHour}
						options={startTimeOption}
						classNamePrefix="primary-select"
					/>
					<span>-</span>
					<CustomSelect
						value={endHour}
						onChange={changeEndHour}
						options={endTimeOption}
						classNamePrefix="primary-select"
					/>
				</div>
			</div>
			<div className={styles.flexComp}>
				<div />
				<CustomSelect
					value={repeat}
					onChange={changeRepeat}
					options={repeatOption}
					classNamePrefix="custom-select"
					className={styles.repeatSelect}
				/>
			</div>
		</>
	)
}

export default Event
