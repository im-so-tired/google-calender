import { PipeTransform } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { ArgumentMetadata } from '@nestjs/common/interfaces'
import { EventsDto } from '../events/events.dto'
import { TasksDto } from '../tasks/tasks.dto'
import { ReminderDto } from '../reminders/reminder.dto'

const validArray = ['no-repeat', 'daily', 'weekly', 'monthly', 'annually']

export class RepeatValidate implements PipeTransform {
	transform(value: EventsDto | TasksDto | ReminderDto, meta: ArgumentMetadata) {
		if (meta.type !== 'body') return value
		if (validArray.indexOf(value.repeat) === -1)
			throw new BadRequestException('Invalid format repeat')
		return value
	}
}
