import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetTimeZone } from '@/hooks/useGetTimeZone'
import { useNumberParams } from '@/hooks/useNumberParams'

const dateFormat = 'DD/MM/YYYY'

const DatePicker: FC = () => {
	const [value, setValue] = useState<Moment | null>()
	const navigate = useNavigate()
	const timeZone = useGetTimeZone()
	const params = useNumberParams()
	const handleChange = (newDate: Moment | null) => {
		if (!newDate) return
		const [day, month, year] = newDate.format(dateFormat).split('/')
		setValue(newDate)
		navigate(`${timeZone}/${year}/${month}/${day}`)
	}

	useEffect(() => {
		setValue(moment(new Date(params.year, params.month - 1, params.day)))
	}, [params])
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
