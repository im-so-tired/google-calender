import { makeAutoObservable, runInAction } from 'mobx'
import toast from 'react-hot-toast'

import { DtoTask, ITask } from '@/shared/types/ITask'
import { QueryParamTime } from '@/shared/types/queryParamTime'

import { TasksService } from '@/services/Tasks.service'
import { UserService } from '@/services/User.service'

import { errorMessage } from '@/utils/errorMessage'

class Task {
	tasks: ITask[] = []

	constructor() {
		makeAutoObservable(this)
	}

	async getTasks(param: QueryParamTime) {
		try {
			const res = await UserService.getTasks(param)
			runInAction(() => {
				this.tasks = res
			})
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async createTask(task: DtoTask) {
		try {
			const newTasks = await TasksService.create(task)
			runInAction(() => {
				this.tasks = [...this.tasks, ...newTasks]
				// this.tasks.push(...newTasks)
				// this.tasks.splice(this.tasks.length, 0, ...newTasks)
			})
			toast.success('Task created!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	clearTasks() {
		this.tasks = []
	}
}

export default new Task()
