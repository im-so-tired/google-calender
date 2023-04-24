import { RepeatType } from '@/shared/types/repeatType'

export interface IReminder {
	id: number
	title: string
	time: number
	repeat: RepeatType
	groupId: number | null
}

export interface DtoReminder extends Omit<IReminder, 'id' | 'groupId'> {}
