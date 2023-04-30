import { observer } from 'mobx-react-lite'
import React from 'react'

import { getGenitiveMonth } from '@utils/date/genitiveMonth'

import pickedDate from '@store/PickedDate'

const SelectedDate = observer(() => {
	const { date } = pickedDate
	const getDate = () => {
		return `${date.date()} ${getGenitiveMonth(date.month() + 1)} ${date.year()}`
	}
	return (
		<h2
			style={{
				fontSize: '20px',
				display: 'inline-block',
				marginLeft: '1.5rem',
			}}
		>
			{getDate()}
		</h2>
	)
})

export default SelectedDate
