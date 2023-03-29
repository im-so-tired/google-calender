import axios from 'axios'

export const axiosBase = axios.create({
	baseURL: 'http://localhost:9000/api',
	headers: {
		'Content-Type': 'application/json',
	},
})
