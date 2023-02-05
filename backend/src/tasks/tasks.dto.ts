import { repeatType } from '../utils/types/repeat'
import { Contains, IsNumber, IsString, Min, MinLength } from 'class-validator'

export class TasksDto {
	@IsString()
	@MinLength(2)
	title: string
	@IsNumber()
	startTime: number
	@IsNumber()
	endTime: number
	@IsString()
	@Contains('no-repeat' || 'daily' || 'weekly' || 'monthly' || 'annually')
	repeat: repeatType
	description?: string
}
