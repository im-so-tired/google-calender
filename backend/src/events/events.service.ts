import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventsEntity } from './events.entity'
import { Repository } from 'typeorm'
import { EventsDto } from './events.dto'

@Injectable()
export class EventsService {
	constructor(@InjectRepository(EventsEntity) private readonly eventsRepository: Repository<EventsEntity>) {
	}

	async create(userId: number, dto: EventsDto) {
		const guests = dto.guests.split(',').map(el => ({ email: el.trim() }))
		const newEvent = this.eventsRepository.create({
			...dto,
			author: { id: userId },
		})
		return await this.eventsRepository.save(newEvent)
	}


	async update(eventId: number, dto: EventsDto) {
		let event = await this.eventsRepository.findOne({
			where: { id: eventId },
		})
		if (!event) throw new NotFoundException('Event not found')
		event = {
			...event,
			...dto,
		}
		return await this.eventsRepository.save(event)
	}
}
