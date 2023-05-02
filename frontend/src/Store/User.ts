import { makeAutoObservable, runInAction } from 'mobx'
import toast from 'react-hot-toast'

import { AuthService } from '@services/Auth/Auth.service'
import { ILoginData } from '@services/Auth/auth.types'
import { removeToken } from '@services/Auth/helpers'

import { errorMessage } from '@utils/errorMessage'
import { getValueLocalStorage } from '@utils/localStorage'

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
		const toastId = toast.loading('Login...')
		try {
			const user = await AuthService.login(data)
			toast.dismiss(toastId)
			toast.success('Login successful')
			runInAction(() => {
				this.user = user
			})
		} catch (e) {
			toast.dismiss(toastId)
			return errorMessage(e)
		}
	}

	async register(data: FormData) {
		const toastId = toast.loading('Register...')
		try {
			const newUser = await AuthService.register(data)
			toast.dismiss(toastId)
			toast.success('Register successful')
			runInAction(() => {
				this.user = newUser
			})
		} catch (e) {
			toast.dismiss(toastId)
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
