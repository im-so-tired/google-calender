import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { observer } from 'mobx-react-lite'
import { Moment } from 'moment'
import React, { FC, useEffect, useState } from 'react'

import pickedDate from '@/store/PickedDate'

const dateFormat = 'DD/MM/YYYY'

const DatePicker: FC = observer(() => {
	const [value, setValue] = useState<Moment | null>()
	const { date } = pickedDate
	const handleChange = (newDate: Moment | null) => {
		if (!newDate) return
		setValue(newDate)
		pickedDate.setDate(newDate)
	}

	useEffect(() => {
		setValue(date)
	}, [date])
	return (
		<DesktopDatePicker
			label="Date desktop"
			inputFormat={dateFormat}
			value={value}
			onChange={handleChange}
			renderInput={params => <TextField {...params} />}
		/>
	)
})

export default DatePicker
