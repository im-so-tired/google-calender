import { IsNumber, IsString, Min } from 'class-validator'
import { repeatType } from '../utils/types/repeat'
import * as moment from 'moment'

export class ReminderDto {
	@IsString()
	title: string
	@IsNumber()
	@Min(moment().unix())
	time: number
	@IsString()
	repeat: repeatType
}
