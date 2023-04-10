import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import styles from '@/common/Modals/CreateModal/CreateModal.module.scss'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'

const dateFormat = 'DD/MM/YYYY'
const ChooseDay: FC = () => {
	const { control } = useCreateModalContext()
	return (
		<Controller
			control={control}
			name="day"
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
