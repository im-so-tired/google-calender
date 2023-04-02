import axios from 'axios'

export const axiosBase = axios.create({
	baseURL: 'http://localhost:9000/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const axiosFile = axios.create({
	baseURL: 'http://localhost:9000/api',
	headers: {
		'Content-Type': 'multipart/form-data',
	},
})

export const axiosImg = axios.create({
	baseURL: 'http://localhost:9000',
	headers: {
		'Content-Type': 'image/*',
	},
})
