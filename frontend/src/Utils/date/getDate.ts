import moment from 'moment'

export const getDate = (day: number, month: number, year: number) => {
	return moment(`${day} ${month} ${year}`, 'D M YYYY')
}
