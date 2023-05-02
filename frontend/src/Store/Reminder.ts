import { makeAutoObservable, runInAction } from 'mobx'
import toast from 'react-hot-toast'

import { QueryParamTime } from '@shared/types/queryParamTime'
import { DtoReminder, IReminder } from '@shared/types/reminder'

import { RemindersService } from '@services/Reminders.service'
import { UserService } from '@services/User.service'

import { errorMessage } from '@utils/errorMessage'

class Reminder {
	reminders: IReminder[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setReminders(reminders: IReminder[]) {
		this.reminders = reminders
	}

	async getReminders(param: QueryParamTime) {
		try {
			const res = await UserService.getReminders(param)
			runInAction(() => {
				this.reminders = res
			})
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async create(reminder: DtoReminder) {
		const toastId = toast.loading('Create an reminder...')
		try {
			const newReminders = await RemindersService.create(reminder)
			runInAction(() => {
				this.reminders = [...this.reminders, ...newReminders]
				// this.tasks.push(...newTasks)
				// this.tasks.splice(this.tasks.length, 0, ...newTasks)
			})
			toast.dismiss(toastId)
			toast.success('Reminder created!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	clear() {
		this.reminders = []
	}

	async delete(id: number) {
		const toastId = toast.loading('Deletion...')
		try {
			const deletedId = await RemindersService.delete(id)
			runInAction(() => {
				this.reminders = this.reminders.filter(
					reminder => reminder.id !== deletedId
				)
			})
			toast.dismiss(toastId)
			toast.success('Reminder deleted!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	async deleteGroup(groupId: number) {
		const toastId = toast.loading('Group deletion...')
		try {
			const deletedId = await RemindersService.deleteGroup(groupId)
			runInAction(() => {
				this.reminders = this.reminders.filter(
					reminder => reminder.groupId !== deletedId
				)
			})
			toast.dismiss(toastId)
			toast.success('Reminder group deleted!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	async update(id: number, newValue: DtoReminder) {
		const toastId = toast.loading('Update in progress...')
		try {
			const { updatedReminder, createdReminders } =
				await RemindersService.update(id, newValue)
			runInAction(() => {
				this.reminders = this.reminders.map(reminder => {
					if (reminder.id === id) {
						reminder = { ...reminder, ...updatedReminder }
					}
					return reminder
				})
				if (createdReminders.length)
					this.reminders = [...this.reminders, ...createdReminders]
			})
			toast.dismiss(toastId)
			toast.success('Reminder updated!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}

	async groupUpdate(groupId: number, taskId: number, newValue: DtoReminder) {
		const toastId = toast.loading('Group update in progress...')
		try {
			const updatedReminders = await RemindersService.updateGroup(
				groupId,
				taskId,
				newValue
			)
			runInAction(() => {
				this.reminders = this.reminders.map(reminder => {
					const updatedReminder = updatedReminders.find(
						el => el.id === reminder.id
					)
					if (updatedReminder) {
						reminder = { ...reminder, ...updatedReminder }
					}
					return reminder
				})
			})
			toast.dismiss(toastId)
			toast.success('Reminder group updated!')
		} catch (e) {
			toast.dismiss(toastId)
			toast.error(errorMessage(e))
		}
	}
}

export default new Reminder()
