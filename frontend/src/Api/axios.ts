import axios from 'axios'
import Cookies from 'js-cookie'

export const axiosBase = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const axiosAuth = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
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
