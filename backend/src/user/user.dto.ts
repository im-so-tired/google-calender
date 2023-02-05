import { IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsString()
	@MinLength(2)
	name: string
	@IsString()
	avatarPath: string
	password?: string
}
