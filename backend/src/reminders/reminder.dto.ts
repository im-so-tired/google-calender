import { IsNumber, IsString, Min } from 'class-validator'
import { repeatType } from '../utils/types/repeat'
import * as moment from 'moment'

export class ReminderDto {
	@IsString()
	title: string
	@IsNumber()
		// @Min(moment().unix(), { message: 'Can\'t create a reminder for past tense!' })
	time: number
	@IsString()
	repeat: repeatType
}
