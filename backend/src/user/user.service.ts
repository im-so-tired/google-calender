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
		const tasks = user.tasks.filter(evt => evt.time >= query.startTime && evt.time <= query.endTime)

		return {
			events,
			tasks,
		}
	}
}
