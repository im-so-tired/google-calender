import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TasksEntity } from './tasks.entity'
import { Repository } from 'typeorm'
import { TasksDto } from './tasks.dto'
import * as moment from 'moment'
import DurationConstructor = moment.unitOfTime.DurationConstructor

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TasksEntity)
		private readonly tasksRepository: Repository<TasksEntity>,
	) {
	}

	async create(userId: number, dto: TasksDto) {
		if (dto.repeat === 'no-repeat') {
			const newTask = this.tasksRepository.create({
				...dto,
				author: { id: userId },
			})
			await this.tasksRepository.save(newTask)
			return [newTask]
		}
		const groupId = Date.now()
		return await this.createRepeat(dto, userId, dto.time, groupId)
	}

	async update(id: number, dto: TasksDto) {
		let task = await this.byId(id)
		let groupId = null
		let repeatTasks = []
		if (dto.repeat !== 'no-repeat') {
			groupId = Date.now()
			repeatTasks = await this.createRepeat(
				dto,
				task.author.id, moment.unix(dto.time).add(1, dto.repeat[0] as DurationConstructor).unix(),
				groupId,
			)
		}
		task = {
			...task,
			...dto,
			groupId,
		}
		await this.tasksRepository.save(task)
		return {
			updatedTask: task,
			createTask: repeatTasks,
		}
	}

	async groupUpdate(groupId: number, userId: number, dto: TasksDto) {
		const tasks = await this.tasksRepository.find({ where: { groupId }, relations: { author: true } })
		if (tasks[0].author.id !== userId) throw new ForbiddenException('You do not have permission to delete this task!!!')
		const updatedTasks = []
		const deltaTime = dto.time - tasks[0].time
		if (dto.repeat === tasks[0].repeat) {
			for (let task of tasks) {
				task = {
					...task,
					...dto,
					time: +task.time + deltaTime,
				}
				updatedTasks.push(task)
				await this.tasksRepository.save(task)
			}
		} else {
			throw new BadRequestException('At the moment, the group cannot change repetitions. Sorry for the inconvenience.')
		}
		return updatedTasks
	}

	async delete(id: number, userId: number) {
		const task = await this.byId(id)
		if (task.author.id !== userId) throw new ForbiddenException('You do not have permission to delete this task!!!')
		await this.tasksRepository.delete({ id: id })
		return id
	}

	async deleteGroup(groupId: number, userId: number) {
		const tasks = await this.getGroup(groupId)
		if (tasks[0].author.id !== userId) throw new ForbiddenException('You do not have permission to delete this group tasks!!!')
		await this.tasksRepository.delete({ groupId })
		return groupId
	}


	async toggleComplete(id: number) {
		const task = await this.byId(id)
		task.completed = !task.completed
		await this.tasksRepository.save(task)
		return task.completed
	}

	async createRepeat(dto: TasksDto, userId: number, time: number, groupId: number) {
		const tasks = []
		for (let i = 0; i < 5; i++) {
			const newTask = await this.tasksRepository.create({
				...dto,
				groupId,
				time,
				author: { id: userId },
			})
			await this.tasksRepository.save(newTask)
			tasks.push(newTask)
			time = moment.unix(time).add(1, dto.repeat[0] as DurationConstructor).unix()
		}
		return tasks
	}

	async byId(id: number) {
		const task = await this.tasksRepository.findOne({ where: { id }, relations: { author: true } })
		if (!task) throw new NotFoundException('Task not found')
		return task
	}

	async getGroup(groupId: number) {
		const tasks = await this.tasksRepository.find({ where: { groupId }, relations: { author: true } })
		if (!tasks) throw new NotFoundException('Group not found')
		return tasks
	}
}
