import { PipeTransform } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { ArgumentMetadata } from '@nestjs/common/interfaces'
import { EventsDto } from '../events/events.dto'

export class TimeValidate implements PipeTransform {
	transform(value: EventsDto, meta: ArgumentMetadata) {
		if (meta.type !== 'body') return value
		if (value.startTime >= value.endTime)
			throw new BadRequestException('The start time of the event must not be later than the end time!')
		return value
	}
}
