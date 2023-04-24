import { IEvent } from '@/shared/types/IEvent'
import { RepeatType } from '@/shared/types/repeatType'

export interface IReminder {
	id: number
	title: number
	time: number
	repeat: RepeatType
	groupId: number | null
}

export interface DtoReminder extends Omit<IEvent, 'id' | 'groupId'> {}
