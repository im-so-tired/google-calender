import { RepeatType } from '@shared/types/repeatType'

export interface IReminder {
	id: number
	title: string
	time: number
	repeat: RepeatType
	groupId: number | null
}

export type DtoReminder = Omit<IReminder, 'id' | 'groupId'>
