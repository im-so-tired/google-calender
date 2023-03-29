import { IUser } from '@/store/User'

export interface ILoginData {
	email: string
	password: string
}

export interface IRegisterData extends ILoginData {
	name: string
	avatarPath: File
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}
