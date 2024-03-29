import {
	Controller,
	Get,
	Param,
	HttpCode,
	Put,
	Body,
	UsePipes,
	ValidationPipe, Query
} from '@nestjs/common'
import {UserService} from './user.service'
import {Auth} from '../auth/decorators/auth.decorator'
import {UserDto} from './user.dto'
import {User} from './user.decorator'
import {QueryParameters} from './user.interface'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	@Get('activity')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async getActivity(@User('id') id: string, @Query() query: QueryParameters) {
		return await this.userService.getActivity(+id, query)
	}

	@Get('tasks')
	@HttpCode(200)
	@Auth
	async getTasks(@User('id') id: number, @Query() query: QueryParameters) {
		return await this.userService.getTasks(id, query)
	}

	@Get('events')
	@HttpCode(200)
	@Auth
	async getEvents(@User('id') id: number, @Query() query: QueryParameters) {
		return await this.userService.getEvents(id, query)
	}

	@Get('reminders')
	@HttpCode(200)
	@Auth
	async getReminders(@User('id') id: number, @Query() query: QueryParameters) {
		return await this.userService.getReminders(id, query)
	}

	@Get(':id')
	@HttpCode(200)
	@Auth
	async byId(@Param('id') id: string) {
		return await this.userService.byId(+id)
	}

	@Put()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@User('id') id: string, @Body() dto: UserDto) {
		return await this.userService.update(+id, dto)
	}
}

