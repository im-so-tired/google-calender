import { repeatType } from '../utils/types/repeat'
import { Contains, IsNumber, IsString, Min, MinLength } from 'class-validator'

export class TasksDto {
	@IsString()
	@MinLength(2)
	title: string
	@IsNumber()
	time: bigint
	@IsString()
	repeat: repeatType
	description?: string
	completed?: boolean
}
