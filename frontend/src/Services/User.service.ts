import { CancelToken } from 'axios/index'

import { IEvent } from '@shared/types/event'
import { QueryParamTime } from '@shared/types/queryParamTime'
import { IReminder } from '@shared/types/reminder'
import { ITask } from '@shared/types/task'

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

	async getActivity(
		param: QueryParamTime,
		cancelToken: CancelToken
	): Promise<{ events: IEvent[]; tasks: ITask[]; reminders: IReminder[] }> {
		const { data } = await axiosAuth('user/activity', {
			params: { startTime: param.startTime, endTime: param.endTime },
			cancelToken,
		})
		return data
	},
}
