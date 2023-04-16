import { makeAutoObservable } from 'mobx'

import { QueryParamTime } from '@/shared/types/queryParamTime'

import { UserService } from '@/services/User.service'

class Task {
	tasks = []

	constructor() {
		makeAutoObservable(this)
	}

	async getTasks(param: QueryParamTime) {
		try {
			this.tasks = await UserService.getTasks(param)
		} catch (e) {}
	}
}

export default new Task()
