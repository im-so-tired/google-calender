import { repeatType } from '../utils/types/repeat'
import { IsNumber, IsString, MinLength } from 'class-validator'

export class TasksDto {
	@IsString()
	@MinLength(2)
	title: string
	@IsNumber()
	time: number
	@IsString()
	repeat: repeatType
	description?: string
	completed?: boolean
}



