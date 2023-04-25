import { makeAutoObservable } from 'mobx'
import moment, { Moment } from 'moment'

import { ITask } from '@/shared/types/ITask'
import { ICreateModal, ITaskModal } from '@/shared/types/modals'
import { Position } from '@/shared/types/position'

export type CreateModalType = 'event' | 'task' | 'reminder'

class Modals {
	loginModal = false

	registerModal = false

	createModal: ICreateModal = {
		open: false,
		type: 'event',
		selectedDate: moment(),
	}

	taskModal: ITaskModal = {
		open: false,
		position: {
			right: 'auto',
			left: 'auto',
			top: 'auto',
			bottom: 'auto',
		},
		task: null,
	}

	constructor() {
		makeAutoObservable(this)
	}

	toggleLoginModal = () => {
		this.loginModal = !this.loginModal
	}

	toggleRegisterModal = () => {
		this.registerModal = !this.registerModal
	}

	toggleCreateModal = (date: Moment = moment()) => {
		this.createModal.open = !this.createModal.open
		this.createModal.selectedDate = date
	}

	changeCreateModalType = (type: CreateModalType) => {
		this.createModal.type = type
	}

	toggleTaskModal = (
		task: ITask | null = null,
		position: Position = {
			right: 'auto',
			left: 'auto',
			top: 'auto',
			bottom: 'auto',
		}
	) => {
		this.taskModal.open = !this.taskModal.open
		this.taskModal.position = position
		this.taskModal.task = task
	}
}

export default new Modals()
