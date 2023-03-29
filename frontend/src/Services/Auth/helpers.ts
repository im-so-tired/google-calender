import Cookies from 'js-cookie'

export const saveToken = (accessToken: string) => {
	Cookies.set('accessToken', accessToken)
}

export const removeToken = () => {
	Cookies.remove('accessToken')
}
