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

	async deleteGroup(groupId: number) {
		try {
			const deletedId = await TasksService.deleteGroup(groupId)
			runInAction(() => {
				this.tasks = this.tasks.filter(task => task.groupId !== deletedId)
			})
			toast.success('Task group deleted!')
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

	async update(id: number, newValue: DtoTask) {
		try {
			const { updatedTask, createdTask } = await TasksService.update(
				id,
				newValue
			)
			runInAction(() => {
				this.tasks = this.tasks.map(task => {
					if (task.id === id) {
						task = { ...task, ...updatedTask }
					}
					return task
				})
				if (createdTask.length) this.tasks = [...this.tasks, ...createdTask]
			})
			toast.success('Task updated!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async groupUpdate(groupId: number, taskId: number, newValue: DtoTask) {
		try {
			const updatedTasks = await TasksService.updateGroup(
				groupId,
				taskId,
				newValue
			)
			runInAction(() => {
				this.tasks = this.tasks.map(task => {
					const updatedTask = updatedTasks.find(el => el.id === task.id)
					if (updatedTask) {
						task = { ...task, ...updatedTask }
					}
					return task
				})
			})
			toast.success('Task group updated!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}
}

export default new Task()
