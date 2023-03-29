import { Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from '../user/user.decorator'
import { ReminderDto } from './reminder.dto'
import { RepeatValidate } from '../pipes/repeat.pipes'

@Controller('reminders')
export class RemindersController {
	constructor(private readonly remindersService: RemindersService) {
	}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async create(@User('id') userId: number, @Body(RepeatValidate) dto: ReminderDto) {
		return await this.remindersService.create(userId, dto)
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@Param('id') id: string, @Body(RepeatValidate) dto: ReminderDto) {
		return await this.remindersService.update(+id, dto)
	}
}
