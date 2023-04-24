import { repeatType } from './types/repeat'
import * as moment from 'moment'

export const countTime = (time: number, repeat: repeatType) => {
	switch (repeat) {
		case 'daily':
			time = moment.unix(time).add(1, 'd').unix()
			break
		case 'weekly':
			time = moment.unix(time).add(1, 'w').unix()
			break
		case 'monthly':
			time = moment.unix(time).add(1, 'M').unix()
			break
	}
	return time
}
