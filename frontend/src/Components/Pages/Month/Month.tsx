import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { useRedirect } from '@/hooks/useRedirect'

import pickedDate from '@/store/PickedDate'

import DevelopmentNotice from '@/common/DevelopmentNotice/DevelopmentNotice'

const MonthPage: FC = observer(() => {
	const { timeZone, date } = pickedDate
	useRedirect(date, timeZone)
	return (
		<div>
			<DevelopmentNotice />
		</div>
	)
})

export default MonthPage
