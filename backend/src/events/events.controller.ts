import { Body, Controller, Delete, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { EventsService } from './events.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from '../user/user.decorator'
import { EventsDto } from './events.dto'
import { RepeatValidate } from '../pipes/repeat.pipes'
import { TimeValidate } from '../pipes/time.pipes'
import { TasksDto } from '../tasks/tasks.dto'

@Controller('events')
export class EventsController {
	constructor(private readonly eventsService: EventsService) {
	}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async create(@User('id') userId: number, @Body(RepeatValidate, TimeValidate) dto: EventsDto) {
		return await this.eventsService.create(userId, dto)
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@Param('id') id: string, @Body(RepeatValidate, TimeValidate) dto: EventsDto) {
		return await this.eventsService.update(+id, dto)
	}

	@Put('/group/:id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async groupUpdate(
		@Param('id') id: string,
		@Query('eventId') eventId: string,
		@User('id') userId: number,
		@Body(RepeatValidate, TimeValidate) dto: EventsDto,
	) {
		return await this.eventsService.groupUpdate(+id, +eventId, userId, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth
	async delete(@Param('id') id: string, @User('id') userId: number) {
		return await this.eventsService.delete(+id, userId)
	}

	@Delete('group/:id')
	@HttpCode(200)
	@Auth
	async deleteGroup(@Param('id') id: string, @User('id') userId: number) {
		return await this.eventsService.deleteGroup(+id, userId)
	}
}
