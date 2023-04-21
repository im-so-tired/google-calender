import { DtoTask, ITask } from '@/shared/types/ITask'

import { axiosAuth } from '../Api/axios'

export const TasksService = {
	async create(task: DtoTask): Promise<ITask[]> {
		const { data } = await axiosAuth.post('/tasks', task)
		return data
	},

	async updateGroup(
		groupId: number,
		taskId: number,
		newData: DtoTask
	): Promise<ITask[]> {
		const { data } = await axiosAuth.put(
			`/tasks/group/${groupId}?taskId=${taskId}`,
			newData
		)
		return data
	},

	async update(
		taskId: number,
		newData: DtoTask
	): Promise<{ updatedTask: ITask; createdTask: ITask[] }> {
		const { data } = await axiosAuth.put(`/tasks/${taskId}`, newData)
		return data
	},

	async changeComplete(taskId: number): Promise<boolean> {
		const { data } = await axiosAuth.patch(`/tasks/complete/${taskId}`)
		return data
	},

	async deleteGroup(groupId: number): Promise<number> {
		const { data } = await axiosAuth.delete(`/tasks/group/${groupId}`)
		return data
	},

	async delete(taskId: number): Promise<number> {
		const { data } = await axiosAuth.delete(`/tasks/${taskId}`)
		return data
	},
}
