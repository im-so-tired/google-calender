import { IUser } from '@/store/User'

import { axiosBase, axiosFile } from '../../Api/axios'

import { IAuthResponse, ILoginData, IRegisterData } from './auth.types'
import { saveToken } from './helpers'

export const AuthService = {
	async login(data: ILoginData): Promise<IUser> {
		const { data: res } = await axiosBase.post<IAuthResponse>(
			'/auth/login',
			data
		)
		saveToken(res.accessToken)
		return res.user
	},

	async register(data: FormData): Promise<IUser> {
		const { data: res } = await axiosFile.post<IAuthResponse>(
			'/auth/register',
			data
		)
		saveToken(res.accessToken)
		return res.user
	},
}
