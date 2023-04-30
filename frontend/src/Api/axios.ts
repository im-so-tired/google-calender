import axios from 'axios'
import Cookies from 'js-cookie'

export const axiosBase = axios.create({
	baseURL: 'https://google-calender-production.up.railway.app/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const axiosAuth = axios.create({
	baseURL: 'https://google-calender-production.up.railway.app/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosAuth.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`
	return config
})
