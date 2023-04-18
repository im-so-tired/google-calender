import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import WeekTable from '@/ui/Tables/WeekTable/WeekTable'

import { useRedirect } from '@/hooks/useRedirect'

import pickedDate from '@/store/PickedDate'

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
