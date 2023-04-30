import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ITimeZone } from '@shared/types/timeZone'
import { Moment } from 'moment'

export const useRedirect = (date: Moment, timeZone: ITimeZone) => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate(`/${timeZone}/${date.year()}/${date.month() + 1}/${date.date()}`)
	}, [date, navigate, timeZone])
}
