import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRedirect } from '@/hooks/useRedirect'

import pickedDate from '@/store/PickedDate'

const DayPage: FC = observer(() => {
	const { timeZone, date } = pickedDate
	useRedirect(date, timeZone)
	// const navigate = useNavigate()
	// useEffect(() => {
	// 	navigate(`/${timeZone}/${date.year()}/${date.month() + 1}/${date.date()}`)
	// }, [date, timeZone])
	return <div>Day</div>
})

export default DayPage
