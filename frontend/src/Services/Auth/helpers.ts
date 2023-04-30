import Cookies from 'js-cookie'

import { IAuthResponse } from '@services/Auth/auth.types'

export const saveToken = (accessToken: string) => {
	Cookies.set('accessToken', accessToken)
}

export const removeToken = () => {
	Cookies.remove('accessToken')
}

export const saveToLs = (data: IAuthResponse) => {
	saveToken(data.accessToken)
	localStorage.setItem('user', JSON.stringify(data.user))
}
