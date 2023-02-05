import moment from 'moment'

export const getCurrentDate = () => ({
	year: moment().format('YYYY'),
	month: moment().format('M'),
	day: moment().format('D'),
})

// export const getCurrentDate2 = () => {
//   const currentDate = moment().format('YYYY M D').split(" ")
//   const date = {
//     year: currentDate[0],
//     month: currentDate[1],
//     day: currentDate[2],
//   }
//   return date
// }
