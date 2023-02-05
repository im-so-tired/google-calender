import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { User } from '../user/user.decorator'
import { TasksDto } from './tasks.dto'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async create(@User('id') userId: number, @Body() dto: TasksDto) {
		return await this.tasksService.create(userId, dto)
	}

	@Get(':id')
	@HttpCode(200)
	@Auth
	async byId(@Param('id') id: string) {
		return await this.tasksService.byId(+id)
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@Param('id') id: string, @Body() dto: TasksDto) {
		return await this.tasksService.update(+id, dto)
	}
}
