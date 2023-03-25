import { repeatType } from '../utils/types/repeat'
import { Contains, IsNumber, IsString, Min, MinLength } from 'class-validator'
import { UserEntity } from '../user/user.entity'

export class EventsDto {
	@IsString()
	@MinLength(2)
	title: string
	@IsNumber()
	startTime: bigint
	@IsNumber()
	endTime: bigint
	@IsString()
	@Contains('no-repeat' || 'daily' || 'weekly' || 'monthly' || 'annually')
	repeat: repeatType
	description?: string
	guests?: UserEntity[]
	location?: string
}
