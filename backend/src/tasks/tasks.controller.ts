import {
	Body,
	Controller, Delete,
	Get,
	HttpCode,
	Param, Patch,
	Post,
	Put, Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { User } from '../user/user.decorator'
import { TasksDto } from './tasks.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { RepeatValidate } from '../pipes/repeat.pipes'

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {
	}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async create(@User('id') userId: number, @Body(RepeatValidate) dto: TasksDto) {
		return await this.tasksService.create(userId, dto)
	}

	@Get(':id')
	@HttpCode(200)
	@Auth
	async byId(@Param('id') id: string) {
		return await this.tasksService.byId(+id)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth
	async delete(@Param('id') id: string, @User('id') userId: number) {
		return await this.tasksService.delete(+id, userId)
	}

	@Delete('group/:id')
	@HttpCode(200)
	@Auth
	async deleteGroup(@Param('id') id: string, @User('id') userId: number) {
		return await this.tasksService.deleteGroup(+id, userId)
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@Param('id') id: string, @Body(RepeatValidate) dto: TasksDto) {
		return await this.tasksService.update(+id, dto)
	}


	@Put('/group/:id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async groupUpdate(
		@Param('id') id: string,
		@Query('taskId') taskId: string,
		@User('id') userId: number,
		@Body(RepeatValidate) dto: TasksDto
	) {
		return await this.tasksService.groupUpdate(+id, +taskId, userId, dto)
	}

	@Patch('complete/:id')
	@HttpCode(200)
	@Auth
	async toggleComplete(@Param('id') id: string) {
		return await this.tasksService.toggleComplete(+id)
	}
}
