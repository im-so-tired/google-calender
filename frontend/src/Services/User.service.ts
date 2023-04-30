import { QueryParamTime } from '@shared/types/queryParamTime'

import { axiosAuth } from '../Api/axios'

export const UserService = {
	async getTasks(param: QueryParamTime) {
		const { data } = await axiosAuth('/user/tasks', {
			params: { startTime: param.startTime, endTime: param.endTime },
		})
		return data
	},

	async getEvents(param: QueryParamTime) {
		const { data } = await axiosAuth('/user/events', {
			params: { startTime: param.startTime, endTime: param.endTime },
		})
		return data
	},

	async getReminders(param: QueryParamTime) {
		const { data } = await axiosAuth('/user/reminders', {
			params: { startTime: param.startTime, endTime: param.endTime },
		})
		return data
	},
}
