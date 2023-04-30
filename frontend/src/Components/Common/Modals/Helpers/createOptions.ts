import moment from 'moment/moment'

import { IOption } from '@shared/types/SelectOpt'

export const startTimeOption: IOption<number>[] = []
for (let i = 0; i <= 23; i += 1) {
	startTimeOption.push({
		value: i,
		label: moment().hour(i).format('h a'),
	})
}
export const endTimeOption: IOption<number>[] = []
for (let i = 1; i <= 24; i += 1) {
	endTimeOption.push({
		value: i,
		label: moment().hour(i).format('h a'),
	})
}
