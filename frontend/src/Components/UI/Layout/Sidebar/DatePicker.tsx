import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { Moment } from 'moment'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetTimeZone } from '@/hooks/useGetTimeZone'

const dateFormat = 'DD/MM/YYYY'

const DatePicker: FC = () => {
	const [value, setValue] = useState<Moment | null>()
	const navigate = useNavigate()
	const timeZone = useGetTimeZone()
	
	const handleChange = (newDate: Moment | null) => {
		if (!newDate) return
		const [day, month, year] = newDate.format(dateFormat).split('/')
		setValue(newDate)
		navigate(`${timeZone}/${year}/${month}/${day}`)
	}

	return (
		<DesktopDatePicker
			label="Date desktop"
			inputFormat={dateFormat}
			value={value}
			onChange={handleChange}
			renderInput={params => <TextField {...params} />}
		/>
	)
}

export default DatePicker
