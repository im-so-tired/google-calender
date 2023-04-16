import { DtoEvent } from '@/shared/types/IEvent'

import { axiosAuth } from '../Api/axios'

export const EventService = {
	async create(data: DtoEvent) {
		const { data: event } = await axiosAuth.post('/events', data)
		return event
	},

	async update(id: number, data: DtoEvent) {
		const { data: event } = await axiosAuth.put(`/events/${id}`, data)
		return event
	},
}
