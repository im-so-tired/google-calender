import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {EventsEntity} from './events.entity'
import {Repository} from 'typeorm'
import {EventsDto} from './events.dto'
import {TasksEntity} from '../tasks/tasks.entity'
import {TasksDto} from '../tasks/tasks.dto'
import {countTime} from '../utils/repeatTime'
import * as moment from 'moment/moment'
import DurationConstructor = moment.unitOfTime.DurationConstructor

@Injectable()
export class EventsService {
	constructor(@InjectRepository(EventsEntity) private readonly eventsRepository: Repository<EventsEntity>) {
	}

	async create(userId: number, dto: EventsDto) {
		if (dto.repeat === 'no-repeat') {
			const newEvent = this.eventsRepository.create({
				...dto,
				author: {id: userId},
			})
			await this.eventsRepository.save(newEvent)
			return [this.returnEventFields(newEvent)]
		}
		const groupId = Date.now()
		return await this.createRepeat(dto, userId, dto.startTime, groupId)
	}


	async update(id: number, dto: EventsDto) {
		let event = await this.byId(id)
		let repeatEvents = []
		if (dto.repeat !== 'no-repeat' && event.repeat !== dto.repeat) {
			const groupId = Date.now()
			event.groupId = groupId
			repeatEvents = await this.createRepeat(dto, event.author.id, countTime(dto.startTime, dto.repeat), groupId)
		}
		event = {
			...event,
			...dto,
		}
		await this.eventsRepository.save(event)
		return {
			updatedEvent: this.returnEventFields(event),
			createdEvents: repeatEvents,
		}
	}

	async groupUpdate(groupId: number, eventId: number, userId: number, dto: EventsDto) {
		const events = await this.eventsRepository.find({where: {groupId}, relations: {author: true}})
		if (!events.length) throw new NotFoundException('Event group not found')
		if (events[0].author.id !== userId) throw new ForbiddenException('You do not have permission to update this event group!!!')
		const updatedEvents = []
		const updatedEvent = events.find(event => event.id === eventId)
		if (!updatedEvent) throw new NotFoundException('Event not found!')
		const deltaStartTime = dto.startTime - updatedEvent.startTime
		const deltaEndTime = dto.endTime - updatedEvent.endTime
		if (dto.repeat === events[0].repeat) {
			for (let event of events) {
				event = {
					...event,
					...dto,
					startTime: +event.startTime + deltaStartTime,
					endTime: +event.endTime + deltaEndTime,
				}
				updatedEvents.push(this.returnEventFields(event))
				await this.eventsRepository.save(event)
			}
		} else {
			throw new BadRequestException('At the moment, the group cannot change repetitions. Sorry for the inconvenience.')
		}
		return updatedEvents
	}

	async delete(id: number, userId: number) {
		const event = await this.byId(id)
		if (event.author.id !== userId) throw new ForbiddenException('You do not have permission to delete this event!!!')
		await this.eventsRepository.delete({id: id})
		return id
	}

	async deleteGroup(groupId: number, userId: number) {
		const events = await this.getGroup(groupId)
		if (events[0].author.id !== userId) throw new ForbiddenException('You do not have permission to delete this group tasks!!!')
		await this.eventsRepository.delete({groupId})
		return groupId
	}

	async createRepeat(dto: EventsDto, userId: number, time: number, groupId: number) {
		const events = []
		const delta = dto.endTime - dto.startTime
		for (let i = 0; i < 7; i++) {
			const newTask = await this.eventsRepository.create({
				...dto,
				groupId,
				startTime: time,
				endTime: time + delta,
				author: {id: userId},
			})
			await this.eventsRepository.save(newTask)
			events.push(this.returnEventFields(newTask))
			time = countTime(time, dto.repeat)
		}
		return events
	}

	async byId(id: number) {
		const event = await this.eventsRepository.findOne({where: {id}, relations: {author: true}})
		if (!event) throw new NotFoundException('Event not found!')
		return event
	}

	async getGroup(groupId: number) {
		const events = await this.eventsRepository.find({where: {groupId}, relations: {author: true}})
		if (!events) throw new NotFoundException('Group not found')
		return events
	}

	returnEventFields(event: EventsEntity) {
		return {
			title: event.title,
			startTime: Number(event.startTime),
			endTime: Number(event.endTime),
			repeat: event.repeat,
			groupId: event.groupId ? Number(event.groupId) : null,
			id: event.id,
			description: event.description,
			guests: event.guests,
		}
	}
}
