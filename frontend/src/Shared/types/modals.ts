import { Moment } from 'moment/moment'

import { Position } from '@/shared/types/position'
import { DtoTask } from '@/shared/types/task'

import { CreateModalType } from '@/store/Modals'

export interface ICreateModal {
	open: boolean
	type: CreateModalType
	selectedDate: Moment
}

export interface IActivityModal<T> {
	open: boolean
	position: Position
	activity: T | null
}

export interface IConfirmUpdateActivity<T> {
	open: boolean
	newValue: T | null
	activityId: number | null
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
