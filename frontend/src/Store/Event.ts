import { makeAutoObservable, runInAction } from 'mobx'
import toast from 'react-hot-toast'

import { DtoEvent, IEvent } from '@/shared/types/event'
import { QueryParamTime } from '@/shared/types/queryParamTime'

import { EventsService } from '@/services/Events.service'
import { UserService } from '@/services/User.service'

import { errorMessage } from '@/utils/errorMessage'

class Event {
	events: IEvent[] = []

	constructor() {
		makeAutoObservable(this)
	}

	async getEvents(param: QueryParamTime) {
		try {
			const res = await UserService.getEvents(param)
			runInAction(() => {
				this.events = res
			})
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async create(event: DtoEvent) {
		try {
			const newEvents = await EventsService.create(event)
			runInAction(() => {
				this.events = [...this.events, ...newEvents]
				// this.tasks.push(...newTasks)
				// this.tasks.splice(this.tasks.length, 0, ...newTasks)
			})
			toast.success('Event created!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	clear() {
		this.events = []
	}

	async delete(id: number) {
		try {
			const deletedId = await EventsService.delete(id)
			runInAction(() => {
				this.events = this.events.filter(event => event.id !== deletedId)
			})
			toast.success('Event deleted!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async deleteGroup(groupId: number) {
		try {
			const deletedId = await EventsService.deleteGroup(groupId)
			runInAction(() => {
				this.events = this.events.filter(event => event.groupId !== deletedId)
			})
			toast.success('Event group deleted!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async update(id: number, newValue: DtoEvent) {
		try {
			const { updatedEvent, createdEvents } = await EventsService.update(
				id,
				newValue
			)
			runInAction(() => {
				this.events = this.events.map(event => {
					if (event.id === id) {
						event = { ...event, ...updatedEvent }
					}
					return event
				})
				if (createdEvents.length)
					this.events = [...this.events, ...createdEvents]
			})
			toast.success('Event updated!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}

	async groupUpdate(groupId: number, taskId: number, newValue: DtoEvent) {
		try {
			const updatedEvents = await EventsService.updateGroup(
				groupId,
				taskId,
				newValue
			)
			runInAction(() => {
				this.events = this.events.map(event => {
					const updatedEvent = updatedEvents.find(el => el.id === event.id)
					if (updatedEvent) {
						event = { ...event, ...updatedEvent }
					}
					return event
				})
			})
			toast.success('Event group updated!')
		} catch (e) {
			toast.error(errorMessage(e))
		}
	}
}

export default new Event()
