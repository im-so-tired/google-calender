export const getGenitiveMonth = (date: number) => {
	let result = ''
	switch (date) {
		case 1:
			result = 'Января'
			break
		case 2:
			result = 'Февраля'
			break
		case 3:
			result = 'Марта'
			break
		case 4:
			result = 'Апреля'
			break
		case 5:
			result = 'Мая'
			break
		case 6:
			result = 'Июня'
			break
		case 7:
			result = 'Июля'
			break
		case 8:
			result = 'Августа'
			break
		case 9:
			result = 'Сентября'
			break
		case 10:
			result = 'Октября'
			break
		case 11:
			result = 'Ноября'
			break
		case 12:
			result = 'Декабря'
			break
		default:
	}
	return result
}
