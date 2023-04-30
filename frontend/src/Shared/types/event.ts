import { RepeatType } from '@shared/types/repeatType'

export interface IEvent {
	id: number
	title: string
	startTime: number
	endTime: number
	guests: string
	description: string
	repeat: RepeatType
	groupId: number | null
}

export type DtoEvent = Omit<IEvent, 'id' | 'groupId'>
