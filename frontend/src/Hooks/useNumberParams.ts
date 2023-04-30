import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IParams } from '@shared/types/params'

export const useNumberParams = () => {
	const { month, day, year } = useParams<IParams>()
	const [params, setParams] = useState({
		month: Number(month),
		day: Number(day),
		year: Number(year),
	})
	useEffect(() => {
		setParams({
			month: Number(month),
			day: Number(day),
			year: Number(year),
		})
	}, [day, month, year])

	return params
}
