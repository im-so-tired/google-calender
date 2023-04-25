import { DtoEvent, IEvent } from '@/shared/types/event'
import { DtoTask, ITask } from '@/shared/types/task'

import { axiosAuth } from '../Api/axios'

export const EventsService = {
	async create(event: DtoEvent): Promise<IEvent[]> {
		const { data } = await axiosAuth.post('/events', event)
		return data
	},

	async updateGroup(
		groupId: number,
		eventId: number,
		newData: DtoEvent
	): Promise<IEvent[]> {
		const { data } = await axiosAuth.put(
			`/events/group/${groupId}?eventId=${eventId}`,
			newData
		)
		return data
	},

	async update(
		eventId: number,
		newData: DtoEvent
	): Promise<{ updatedEvent: IEvent; createdEvents: IEvent[] }> {
		const { data } = await axiosAuth.put(`/events/${eventId}`, newData)
		return data
	},

	async deleteGroup(eventId: number): Promise<number> {
		const { data } = await axiosAuth.delete(`/events/group/${eventId}`)
		return data
	},

	async delete(eventId: number): Promise<number> {
		const { data } = await axiosAuth.delete(`/events/${eventId}`)
		return data
	},
}
