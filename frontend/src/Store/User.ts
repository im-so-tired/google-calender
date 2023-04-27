import { makeAutoObservable } from 'mobx'

import { AuthService } from '@/services/Auth/Auth.service'
import { ILoginData } from '@/services/Auth/auth.types'
import { removeToken } from '@/services/Auth/helpers'

import { errorMessage } from '@/utils/errorMessage'
import { getValueLocalStorage } from '@/utils/localStorage'

export interface IUser {
	id: number
	name: string
	email: string
	avatarPath: string
}

class User {
	user: IUser | null = null

	constructor() {
		this.user = getValueLocalStorage('user')
		makeAutoObservable(this)
	}

	async login(data: ILoginData) {
		try {
			this.user = await AuthService.login(data)
		} catch (e) {
			return errorMessage(e)
		}
	}

	async register(data: FormData) {
		try {
			this.user = await AuthService.register(data)
			console.log(this.user)
		} catch (e) {
			return errorMessage(e)
		}
	}

	logout() {
		removeToken()
		localStorage.removeItem('user')
		this.user = null
	}
}

export default new User()
