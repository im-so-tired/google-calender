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

export interface ITaskData extends Omit<IFormData, 'guests' | 'endHour'> {}

export interface IReminderData
	extends Omit<IFormData, 'guests' | 'endHour' | 'description'> {}

export interface IEventData extends IFormData {}
