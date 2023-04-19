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

	async deleteTask(id: number) {
		try {
			const deletedId = await TasksService.delete(id)
			runInAction(() => {
				this.tasks = this.tasks.filter(task => task.id !== deletedId)
			})
			toast.success('Task deleted!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async changeComplete(id: number) {
		try {
			const newComplete = await TasksService.changeComplete(id)
			runInAction(() => {
				this.tasks = this.tasks.map(task => {
					if (task.id === id) {
						task.completed = newComplete
					}
					return task
				})
			})
			toast.success('Task updated!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}
}

export default new Task()
