import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TasksEntity } from './tasks.entity'
import { Repository } from 'typeorm'
import { TasksDto } from './tasks.dto'
import { countTime } from '../utils/repeatTime'

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
			return [this.returnTaskFields(newTask)]
		}
		const groupId = Date.now()
		return await this.createRepeat(dto, userId, dto.time, groupId)
	}

	async update(id: number, dto: TasksDto) {
		let task = await this.byId(id)
		let repeatTasks = []
		if (dto.repeat !== 'no-repeat' && task.repeat !== dto.repeat) {
			const groupId = Date.now()
			task.groupId = groupId
			repeatTasks = await this.createRepeat(dto, task.author.id, countTime(dto.time, dto.repeat), groupId)
		}
		task = {
			...task,
			...dto,
		}
		await this.tasksRepository.save(task)
		return {
			updatedTask: this.returnTaskFields(task),
			createdTask: repeatTasks,
		}
	}

	async groupUpdate(groupId: number, taskId: number, userId: number, dto: TasksDto) {
		const tasks = await this.tasksRepository.find({ where: { groupId }, relations: { author: true } })
		if (!tasks.length) throw new NotFoundException('Task group not found')
		if (tasks[0].author.id !== userId) throw new ForbiddenException('You do not have permission to update this task group!!!')
		const updatedTasks = []
		const deltaTime = dto.time - tasks.find(task => task.id === taskId).time
		if (dto.repeat === tasks[0].repeat) {
			for (let task of tasks) {
				task = {
					...task,
					...dto,
					time: +task.time + deltaTime,
				}
				updatedTasks.push(this.returnTaskFields(task))
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
			tasks.push(this.returnTaskFields(newTask))
			time = countTime(time, dto.repeat)
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

	returnTaskFields(task: TasksEntity) {
		return {
			title: task.title,
			time: Number(task.time),
			repeat: task.repeat,
			groupId: task.groupId ? Number(task.groupId) : null,
			id: task.id,
			description: task.description,
			completed: task.completed,
		}
	}
}
