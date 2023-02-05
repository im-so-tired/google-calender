import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}

	@Post('login')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}
}
