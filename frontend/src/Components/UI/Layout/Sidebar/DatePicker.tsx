import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { Moment } from 'moment'
import React, { FC, useState } from 'react'

const DatePicker: FC = () => {
	const [value, setValue] = useState<Moment | null>()

	const handleChange = (newDate: Moment | null) => {
		setValue(newDate)
	}
	
	return (
		<DesktopDatePicker
			label="Date desktop"
			inputFormat="MM/DD/YYYY"
			value={value}
			onChange={handleChange}
			renderInput={params => <TextField {...params} />}
		/>
	)
}

export default DatePicker
