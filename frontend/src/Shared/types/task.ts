import { RepeatType } from '@shared/types/repeatType'

export interface ITask {
	id: number
	title: string
	description: string
	time: number
	repeat: RepeatType
	groupId: number | null
	completed: boolean
}

export type DtoTask = Omit<ITask, 'id' | 'groupId' | 'completed'>
