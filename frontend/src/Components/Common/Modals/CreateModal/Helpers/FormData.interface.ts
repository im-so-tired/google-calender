import { Moment } from 'moment'

import { IOption } from '@/shared/types/SelectOpt'
import { RepeatType } from '@/shared/types/repeatType'

export interface IFormData {
	title: string
	day: Moment
	startHour: IOption<number>
	endHour: IOption<number>
	description: string
	guests: string
	repeat: IOption<RepeatType>
}
