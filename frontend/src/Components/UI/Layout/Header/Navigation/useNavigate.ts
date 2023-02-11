import { useParams } from 'react-router-dom'

import { useGetTimeZone } from '@/hooks/useGetTimeZone'

import { getGenitiveMonth } from '@/utils/date/genitiveMonth'

export const useNavigate = () => {
	const { day, month, year } = useParams()
	const timeZone = useGetTimeZone()

	const dayInMonthIs30 = (value: number) =>
		value === 4 || value === 6 || value === 9 || value === 11

	const nextDay = () => {
		let numDay = Number(day)
		let numMonth = Number(month)
		let numYear = Number(year)

		if (dayInMonthIs30(numMonth) ? numDay !== 30 : numDay !== 31) {
			numDay += 1
		} else if (numMonth !== 12) {
			numMonth += 1
			numDay = 1
		} else {
			numYear += 1
			numMonth = 1
			numDay = 1
		}
		return `${timeZone}/${numYear}/${numMonth}/${numDay}`
	}

	const previousDay = () => {
		let numDay = Number(day)
		let numMonth = Number(month)
		let numYear = Number(year)

		if (numDay !== 1) {
			numDay -= 1
		} else if (numMonth !== 1) {
			numMonth -= 1
			numDay = dayInMonthIs30(numMonth) ? 30 : 31
		} else {
			numYear -= 1
			numMonth = 12
			numDay = dayInMonthIs30(numMonth) ? 30 : 31
		}
		return `${timeZone}/${numYear}/${numMonth}/${numDay}`
	}

	const getDate = () => {
		return `${day} ${getGenitiveMonth(Number(month))} ${year}`
	}

	return { nextDay, previousDay, getDate }
}
