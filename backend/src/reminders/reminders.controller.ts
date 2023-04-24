import { Body, Controller, Delete, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
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

	@Put('/group/:id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async groupUpdate(
		@Param('id') id: string,
		@Query('reminderId') reminderId: string,
		@User('id') userId: number,
		@Body(RepeatValidate) dto: ReminderDto,
	) {
		return await this.remindersService.groupUpdate(+id, +reminderId, userId, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth
	async delete(@Param('id') id: string, @User('id') userId: number) {
		return await this.remindersService.delete(+id, userId)
	}

	@Delete('group/:id')
	@HttpCode(200)
	@Auth
	async deleteGroup(@Param('id') id: string, @User('id') userId: number) {
		return await this.remindersService.deleteGroup(+id, userId)
	}
}
