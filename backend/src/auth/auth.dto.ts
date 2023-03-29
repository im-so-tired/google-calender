import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
	@IsEmail()
	email: string
	@MinLength(6)
	@IsString()
	password: string
}

export class RegisterDto extends LoginDto {
	@IsString()
	name: string
	avatarPath?: File
}
