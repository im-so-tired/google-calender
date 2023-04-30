import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import WeekTable from '@ui/Tables/WeekTable/WeekTable'

import { useRedirect } from '@hooks/useRedirect'

import pickedDate from '@store/PickedDate'

const WeekPage: FC = observer(() => {
	const { timeZone, date } = pickedDate
	useRedirect(date, timeZone)

	return (
		<div>
			<WeekTable />
		</div>
	)
})

export default WeekPage
