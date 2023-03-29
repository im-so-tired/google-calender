import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RemindersEntity } from './reminders.entity'
import { Repository } from 'typeorm'
import { ReminderDto } from './reminder.dto'

@Injectable()
export class RemindersService {
	constructor(@InjectRepository(RemindersEntity) private readonly reminderRepository: Repository<RemindersEntity>) {
	}

	async create(userId: number, dto: ReminderDto) {
		const newReminder = this.reminderRepository.create({
			...dto,
			author: { id: userId },
		})
		return await this.reminderRepository.save(newReminder)
	}

	async update(id: number, dto: ReminderDto) {
		let reminder = await this.byId(id)
		reminder = {
			...reminder,
			...dto,
		}
		return await this.reminderRepository.save(reminder)
	}

	async byId(id: number) {
		const reminder = await this.reminderRepository.findOne({ where: { id } })
		if (!reminder) throw new NotFoundException('Reminder not found')
		return reminder
	}
}
