import { Contains, IsNumber, IsString, Min } from 'class-validator'
import { repeatType } from '../utils/types/repeat'

export class ReminderDto {
	@IsString()
	title: string
	@IsNumber()
	@Min(Date.now())
	date: bigint
	@IsString()
	repeat: repeatType
}
