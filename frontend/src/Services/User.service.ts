import { QueryParamTime } from '@/shared/types/queryParamTime'

import { axiosAuth } from '../Api/axios'

export const UserService = {
	async getTasks(param: QueryParamTime) {
		const { data } = await axiosAuth('/user/tasks', {
			params: { startTime: param.startTime, endTime: param.endTime },
		})
		return data
	},
}
