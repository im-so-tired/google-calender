import { makeAutoObservable } from 'mobx'

import { DtoEvent } from '@/shared/types/event'
import { IConfirmUpdateActivity } from '@/shared/types/modals'
import { DtoReminder } from '@/shared/types/reminder'
import { DtoTask } from '@/shared/types/task'

class ConfirmModals {
	constructor() {
		makeAutoObservable(this)
	}

	confirmUpdateTask: IConfirmUpdateActivity<DtoTask> = {
		open: false,
		newValue: null,
		activityId: null,
	}

	confirmUpdateEvent: IConfirmUpdateActivity<DtoEvent> = {
		open: false,
		newValue: null,
		activityId: null,
	}

	confirmUpdateReminder: IConfirmUpdateActivity<DtoReminder> = {
		open: false,
		newValue: null,
		activityId: null,
	}

	confirmDeleteTask = false

	confirmDeleteEvent = false

	confirmDeleteReminder = false

	toggleUpdateTask = (
		newValue: DtoTask | null = null,
		taskId: number | null = null
	) => {
		this.confirmUpdateTask.open = !this.confirmUpdateTask.open
		this.confirmUpdateTask.newValue = newValue
		this.confirmUpdateTask.activityId = taskId
	}

	toggleUpdateEvent = (
		newValue: DtoEvent | null = null,
		eventId: number | null = null
	) => {
		this.confirmUpdateEvent.open = !this.confirmUpdateEvent.open
		this.confirmUpdateEvent.newValue = newValue
		this.confirmUpdateEvent.activityId = eventId
	}

	toggleUpdateReminder = (
		newValue: DtoReminder | null = null,
		reminderId: number | null = null
	) => {
		this.confirmUpdateReminder.open = !this.confirmUpdateReminder.open
		this.confirmUpdateReminder.newValue = newValue
		this.confirmUpdateReminder.activityId = reminderId
	}

	toggleDeleteTask = () => {
		this.confirmDeleteTask = !this.confirmDeleteTask
	}

	toggleDeleteEvent = () => {
		this.confirmDeleteEvent = !this.confirmDeleteEvent
	}

	toggleDeleteReminder = () => {
		this.confirmDeleteReminder = !this.confirmDeleteReminder
	}
}

export default new ConfirmModals()
