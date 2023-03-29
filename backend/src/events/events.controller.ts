import { Body, Controller, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { EventsService } from './events.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from '../user/user.decorator'
import { EventsDto } from './events.dto'
import { RepeatValidate } from '../pipes/repeat.pipes'

@Controller('events')
export class EventsController {
	constructor(private readonly eventsService: EventsService) {
	}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async create(@User('id') userId: number, @Body(RepeatValidate) dto: EventsDto) {
		return await this.eventsService.create(userId, dto)
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@Param('id') id: string, @Body(RepeatValidate) dto: EventsDto) {
		return await this.eventsService.update(+id, dto)
	}
}
