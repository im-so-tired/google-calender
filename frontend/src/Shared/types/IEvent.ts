import { Moment } from 'moment'

import { RepeatType } from '@/shared/types/repeatType'

export interface IEvent {
	title: string
	startTime: number
	endTime: number
	guests: string
	description: string
	repeat: RepeatType
}
