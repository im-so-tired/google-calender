import { IUser } from '@/store/User'

import { axiosBase } from '../../Api/axios'

import { IAuthResponse, ILoginData, IRegisterData } from './auth.types'
import { saveToLs, saveToken } from './helpers'

export const AuthService = {
	async login(data: ILoginData): Promise<IUser> {
		const { data: res } = await axiosBase.post<IAuthResponse>(
			'/auth/login',
			data
		)
		saveToLs(res)
		return res.user
	},

	async register(data: FormData): Promise<IUser> {
		const { data: res } = await axiosBase.post<IAuthResponse>(
			'/auth/register',
			data
		)
		saveToLs(res)
		return res.user
	},
}
