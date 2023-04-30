import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import DayTable from '@ui/Tables/DayTable/DayTable'

import { useRedirect } from '@hooks/useRedirect'

import pickedDate from '@store/PickedDate'

const DayPage: FC = observer(() => {
	const { timeZone, date } = pickedDate
	useRedirect(date, timeZone)

	return (
		<div>
			<DayTable />
		</div>
	)
})

export default DayPage
