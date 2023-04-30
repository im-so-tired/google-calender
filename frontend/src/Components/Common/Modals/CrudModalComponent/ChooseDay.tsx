import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

import styles from '../CrudModal.module.scss'

const dateFormat = 'DD/MM/YYYY'
const ChooseDay: FC<{ control: Control<any, any> }> = ({ control }) => {
	return (
		<Controller
			control={control}
			name='day'
			render={({ field }) => (
				<DatePicker
					className={styles.datePicker}
					onChange={field.onChange}
					value={field.value}
					inputFormat={dateFormat}
					renderInput={params => <TextField {...params} />}
				/>
			)}
		/>
	)
}

export default ChooseDay
