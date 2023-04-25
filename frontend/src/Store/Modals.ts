import { makeAutoObservable } from 'mobx'
import moment, { Moment } from 'moment'

import { IEvent } from '@/shared/types/event'
import { IActivityModal, ICreateModal } from '@/shared/types/modals'
import { Position } from '@/shared/types/position'
import { IReminder } from '@/shared/types/reminder'
import { ITask } from '@/shared/types/task'

export type CreateModalType = 'event' | 'task' | 'reminder'

class Modals {
	loginModal = false

	registerModal = false

	createModal: ICreateModal = {
		open: false,
		type: 'event',
		selectedDate: moment(),
	}

	taskModal: IActivityModal<ITask> = {
		open: false,
		position: {
			right: 'auto',
			left: 'auto',
			top: 'auto',
			bottom: 'auto',
		},
		activity: null,
	}

	eventModal: IActivityModal<IEvent> = {
		open: false,
		position: {
			right: 'auto',
			left: 'auto',
			top: 'auto',
			bottom: 'auto',
		},
		activity: null,
	}

	reminderModal: IActivityModal<IReminder> = {
		open: false,
		position: {
			right: 'auto',
			left: 'auto',
			top: 'auto',
			bottom: 'auto',
		},
		activity: null,
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
		this.taskModal.activity = task
	}

	toggleEventModal = (
		event: IEvent | null = null,
		position: Position = {
			right: 'auto',
			left: 'auto',
			top: 'auto',
			bottom: 'auto',
		}
	) => {
		this.eventModal.open = !this.taskModal.open
		this.eventModal.position = position
		this.eventModal.activity = event
	}

	toggleReminderModal = (
		reminder: IReminder | null = null,
		position: Position = {
			right: 'auto',
			left: 'auto',
			top: 'auto',
			bottom: 'auto',
		}
	) => {
		this.reminderModal.open = !this.taskModal.open
		this.reminderModal.position = position
		this.reminderModal.activity = reminder
	}
}

export default new Modals()
