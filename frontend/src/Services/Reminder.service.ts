import { DtoReminder, IReminder } from '@/shared/types/IReminder'

import { axiosAuth } from '../Api/axios'

export const RemindersService = {
	async create(reminder: DtoReminder): Promise<IReminder[]> {
		const { data } = await axiosAuth.post('/reminders', reminder)
		return data
	},

	async updateGroup(
		groupId: number,
		reminderId: number,
		newData: DtoReminder
	): Promise<IReminder[]> {
		const { data } = await axiosAuth.put(
			`/reminders/group/${groupId}?reminderId=${reminderId}`,
			newData
		)
		return data
	},

	async update(
		reminderId: number,
		newData: DtoReminder
	): Promise<{ updatedTask: IReminder; createdTask: IReminder[] }> {
		const { data } = await axiosAuth.put(`/tasks/${reminderId}`, newData)
		return data
	},

	async deleteGroup(groupId: number): Promise<number> {
		const { data } = await axiosAuth.delete(`/reminders/group/${groupId}`)
		return data
	},

	async delete(reminderId: number): Promise<number> {
		const { data } = await axiosAuth.delete(`/reminders/${reminderId}`)
		return data
	},
}
