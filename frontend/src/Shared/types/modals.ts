import { Moment } from 'moment/moment'

import { DtoTask, ITask } from '@/shared/types/ITask'
import { Position } from '@/shared/types/position'

import { CreateModalType } from '@/store/Modals'

export interface ICreateModal {
	open: boolean
	type: CreateModalType
	selectedDate: Moment
}

export interface ITaskModal {
	open: boolean
	position: Position
	task: ITask | null
}

export interface IConfirmUpdateTask {
	open: boolean
	newValue: DtoTask | null
	taskId: number | null
}

export interface IConfirmDeleteTask {
	open: boolean
	id: number
}

export interface IConfirmModal {
	id: number
	groupId: number
	closeMainModal: () => void
}
