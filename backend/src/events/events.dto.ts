import { repeatType } from '../utils/types/repeat'
import { IsNumber, IsString, Min, MinLength } from 'class-validator'
import { UserEntity } from '../user/user.entity'

export class EventsDto {
	@IsString()
	@MinLength(2)
	title: string
	@IsNumber()
	startTime: number
	@IsNumber()
	endTime: number
	@IsString()
	repeat: repeatType

	guests?: string
	// location?: string
	description?: string
}
