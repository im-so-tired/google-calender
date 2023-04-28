import { makeAutoObservable } from 'mobx'
import moment, { Moment } from 'moment'

import { ITimeZone } from '@/shared/types/timeZone'

import { getValueLocalStorage } from '@/utils/localStorage'

class PickedDate {
	timeZone: ITimeZone = getValueLocalStorage('timeZone')?.value || 'day'

	date: Moment = moment()

	constructor() {
		makeAutoObservable(this)
	}

	next() {
		this.date = moment(this.date).add(1, this.timeZone)
	}

	prev() {
		this.date = moment(this.date).add(-1, this.timeZone)
	}

	setDate(value: Moment) {
		this.date = value
	}

	setTimeZone(newZone: ITimeZone) {
		this.timeZone = newZone
	}
}

export default new PickedDate()
