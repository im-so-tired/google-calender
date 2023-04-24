import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RemindersEntity } from './reminders.entity'
import { Repository } from 'typeorm'
import { ReminderDto } from './reminder.dto'
import * as moment from 'moment/moment'
import { countTime } from '../utils/repeatTime'
import DurationConstructor = moment.unitOfTime.DurationConstructor
import { TasksDto } from '../tasks/tasks.dto'

@Injectable()
export class RemindersService {
	constructor(@InjectRepository(RemindersEntity) private readonly reminderRepository: Repository<RemindersEntity>) {
	}

	async create(userId: number, dto: ReminderDto) {
		if (dto.repeat === 'no-repeat') {
			const newReminder = this.reminderRepository.create({
				...dto,
				author: { id: userId },
			})
			await this.reminderRepository.save(newReminder)
			return [this.returnReminderFields(newReminder)]
		}
		const groupId = Date.now()
		return await this.createRepeat(dto, userId, dto.time, groupId)
	}

	async update(id: number, dto: ReminderDto) {
		let reminder = await this.byId(id)
		let repeatReminders = []
		if (dto.repeat !== 'no-repeat' && !reminder.groupId) {
			const groupId = Date.now()
			reminder.groupId = groupId
			repeatReminders = await this.createRepeat(dto, reminder.author.id, countTime(dto.time, dto.repeat), groupId)
		}
		reminder = {
			...reminder,
			...dto,
		}
		await this.reminderRepository.save(reminder)
		return {
			updatedReminder: this.returnReminderFields(reminder),
			createdReminders: repeatReminders,
		}
	}

	async groupUpdate(groupId: number, reminderId: number, userId: number, dto: ReminderDto) {
		const reminders = await this.reminderRepository.find({ where: { groupId }, relations: { author: true } })
		if (!reminders.length) throw new NotFoundException('Reminder group not found')
		if (reminders[0].author.id !== userId) throw new ForbiddenException('You do not have permission to update this reminder group!!!')
		const updatedTasks = []
		const deltaTime = dto.time - reminders.find(reminder => reminder.id === reminderId).time
		if (dto.repeat === reminders[0].repeat) {
			for (let reminder of reminders) {
				reminder = {
					...reminder,
					...dto,
					time: +reminder.time + deltaTime,
				}
				updatedTasks.push(this.returnReminderFields(reminder))
				await this.reminderRepository.save(reminder)
			}
		} else {
			throw new BadRequestException('At the moment, the group cannot change repetitions. Sorry for the inconvenience.')
		}
		return updatedTasks
	}

	async delete(id: number, userId: number) {
		const reminder = await this.byId(id)
		if (reminder.author.id !== userId) throw new ForbiddenException('You do not have permission to delete this task!!!')
		await this.reminderRepository.delete({ id: id })
		return id
	}

	async deleteGroup(groupId: number, userId: number) {
		const reminders = await this.getGroup(groupId)
		if (reminders[0].author.id !== userId) throw new ForbiddenException('You do not have permission to delete this group tasks!!!')
		await this.reminderRepository.delete({ groupId })
		return groupId
	}

	async byId(id: number) {
		const reminder = await this.reminderRepository.findOne({ where: { id }, relations: { author: true } })
		if (!reminder) throw new NotFoundException('Reminder not found')
		return reminder
	}

	async getGroup(groupId: number) {
		const reminders = await this.reminderRepository.find({ where: { groupId }, relations: { author: true } })
		if (!reminders) throw new NotFoundException('Group not found')
		return reminders
	}

	async createRepeat(dto: ReminderDto, userId: number, time: number, groupId: number) {
		const tasks = []
		for (let i = 0; i < 5; i++) {
			const newReminder = await this.reminderRepository.create({
				...dto,
				groupId,
				time,
				author: { id: userId },
			})
			await this.reminderRepository.save(newReminder)
			tasks.push(this.returnReminderFields(newReminder))
			time = countTime(time, dto.repeat)
		}
		return tasks
	}

	returnReminderFields(reminder: RemindersEntity) {
		return {
			title: reminder.title,
			time: Number(reminder.time),
			repeat: reminder.repeat,
			groupId: reminder.groupId ? Number(reminder.groupId) : null,
			id: reminder.id,
		}
	}
}
