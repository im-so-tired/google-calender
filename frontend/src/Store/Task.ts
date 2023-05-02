import { makeAutoObservable, runInAction } from 'mobx'
import toast from 'react-hot-toast'

import { QueryParamTime } from '@shared/types/queryParamTime'
import { DtoTask, ITask } from '@shared/types/task'

import { TasksService } from '@services/Tasks.service'
import { UserService } from '@services/User.service'

import { errorMessage } from '@utils/errorMessage'

class Task {
	tasks: ITask[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setTasks(tasks: ITask[]) {
		this.tasks = tasks
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
		const toastId = toast.loading('Create an task...')
		try {
			const newTasks = await TasksService.create(task)
			runInAction(() => {
				this.tasks = [...this.tasks, ...newTasks]
				// this.tasks.push(...newTasks)
				// this.tasks.splice(this.tasks.length, 0, ...newTasks)
			})
			toast.dismiss(toastId)
			toast.success('Task created!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	clearTasks() {
		this.tasks = []
	}

	async deleteTask(id: number) {
		const toastId = toast.loading('Deletion...')
		try {
			const deletedId = await TasksService.delete(id)
			runInAction(() => {
				this.tasks = this.tasks.filter(task => task.id !== deletedId)
			})
			toast.dismiss(toastId)
			toast.success('Task deleted!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	async deleteGroup(groupId: number) {
		const toastId = toast.loading('Group deletion...')
		try {
			const deletedId = await TasksService.deleteGroup(groupId)
			runInAction(() => {
				this.tasks = this.tasks.filter(task => task.groupId !== deletedId)
			})
			toast.dismiss(toastId)
			toast.success('Task group deleted!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	async changeComplete(id: number) {
		const toastId = toast.loading('Change completion...')
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
			toast.dismiss(toastId)
			toast.success('Task updated!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	async update(id: number, newValue: DtoTask) {
		const toastId = toast.loading('Update in progress...')
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
			toast.dismiss(toastId)
			toast.success('Task updated!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	async groupUpdate(groupId: number, taskId: number, newValue: DtoTask) {
		const toastId = toast.loading('Group update in progress...')
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
			toast.dismiss(toastId)
			toast.success('Task group updated!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}
}

export default new Task()
