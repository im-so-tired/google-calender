import { makeAutoObservable } from 'mobx'

import { DtoTask } from '@/shared/types/ITask'
import { IConfirmUpdateTask } from '@/shared/types/modals'

class ConfirmModals {
	constructor() {
		makeAutoObservable(this)
	}

	confirmUpdateTask: IConfirmUpdateTask = {
		open: false,
		newValue: null,
		taskId: null,
	}

	confirmDeleteTask = false

	toggleUpdateTask = (
		newValue: DtoTask | null = null,
		taskId: number | null = null
	) => {
		this.confirmUpdateTask.open = !this.confirmUpdateTask.open
		this.confirmUpdateTask.newValue = newValue
		this.confirmUpdateTask.taskId = taskId
	}

	toggleDeleteTask = () => {
		this.confirmDeleteTask = !this.confirmDeleteTask
	}
}

export default new ConfirmModals()
