import { Moment } from 'moment'

import { useNumberParams } from '@/hooks/useNumberParams'

import { getDate } from '@/utils/date/getDate'

export const useWeekTable = () => {
	const { month, day, year } = useNumberParams()

	const tableArray: Moment[][] = Array.from(Array(24), (_, i) =>
		new Array(7)
			.fill(0)
			.map((el, dayIdx) =>
				getDate(day, month, year).locale('RU').weekday(dayIdx).hour(i)
			)
	)

	const tableHead = new Array(7).fill(0).map((_, i) => {
		const date = getDate(day, month, year).locale('RU').weekday(i)
		return {
			date: date.locale('EN').format('D ddd'),
			link: `/day/${date.format('YYYY/M/D')}`,
		}
	})

	return { tableArray, tableHead }
}
