import { makeAutoObservable } from 'mobx'

import { AuthService } from '@/services/Auth/AuthService'
import { ILoginData } from '@/services/Auth/auth.types'

import { errorMessage } from '@/utils/errorMessage'

export interface IUser {
	id: number
	name: string
	email: string
	avatarPath: string
}

class User {
	user: IUser | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async login(data: ILoginData) {
		try {
			this.user = await AuthService.login(data)
		} catch (e) {
			return errorMessage(e)
		}
	}
}

export default new User()
