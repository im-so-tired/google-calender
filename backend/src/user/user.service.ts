import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { UserDto } from './user.dto'
import { QueryParameters } from './user.interface'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserEntity: Repository<UserEntity>,
	) {
	}

	async byId(userId: number) {
		const user = await this.UserEntity.findOne({
			where: { id: userId },
			select: ['id', 'email', 'avatarPath', 'name'],
			relations: {
				events: true,
				tasks: true,
				reminders: true,
			},
		})
		if (!user) throw new NotFoundException('Пользователь не найден!')
		return user
	}

	async update(userId: number, dto: UserDto) {
		let user = await this.byId(userId)
		user = {
			...user,
			...dto,
		}
		return await this.UserEntity.save(user)
	}

	async getActivity(userId: number, query: QueryParameters) {
		const user = await this.UserEntity.findOne({
			where: { id: userId },
			relations: {
				events: true,
				tasks: true,
				reminders: true,
			},
		})

		const events = user.events.filter(evt => evt.startTime >= query.startTime && evt.endTime <= query.endTime)
		const tasks = user.tasks.filter(task => task.time >= query.startTime && task.time <= query.endTime)
		const reminders = user.reminders.filter(rem => rem.time >= query.startTime && rem.time <= query.endTime)
		return {
			events,
			tasks,
			reminders,
		}
	}

	async getTasks(userId, query: QueryParameters) {
		const user = await this.UserEntity.findOne({
			where: { id: userId },
			relations: {
				tasks: true,
			},
		})
		return user.tasks.filter(task => +task.time >= query.startTime && +task.time <= query.endTime)
	}

	async getEvents(userId, query: QueryParameters) {
		const user = await this.UserEntity.findOne({
			where: { id: userId },
			relations: {
				events: true,
			},
		})
		return user.events.filter(evt => evt.startTime >= query.startTime && evt.endTime <= query.endTime)
	}

	async getReminders(userId, query: QueryParameters) {
		const user = await this.UserEntity.findOne({
			where: { id: userId },
			relations: {
				reminders: true,
			},
		})
		return user.reminders.filter(rem => rem.time >= query.startTime && rem.time <= query.endTime)
	}
}
