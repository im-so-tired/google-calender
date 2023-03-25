import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TasksEntity } from './tasks.entity'
import { Repository } from 'typeorm'
import { TasksDto } from './tasks.dto'

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TasksEntity)
		private readonly tasksRepository: Repository<TasksEntity>,
	) {
	}

	async create(userId: number, dto: TasksDto) {
		const newTask = this.tasksRepository.create({
			...dto,
			author: { id: userId },
		})
		return await this.tasksRepository.save(newTask)
	}

	async update(id: number, dto: TasksDto) {
		let task = await this.byId(id)
		task = {
			...task,
			...dto,
		}
		return await this.tasksRepository.save(task)
	}

	async byId(id: number) {
		const task = await this.tasksRepository.findOne({
			where: { id },
			relations: {
				author: true,
			},
			select: {
				author: {
					id: true,
					email: true,
				},
			},
		})
		if (!task) throw new NotFoundException('Task not found')
		return task
	}

}
