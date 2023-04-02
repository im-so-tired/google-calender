import {
	Body,
	Controller,
	HttpCode,
	Post, UploadedFile, UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './auth.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('register')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@UseInterceptors(FileInterceptor('avatar', {
		storage: diskStorage({
			destination: './upload/avatars',
			filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
				callback(null, Date.now() + '-' + file.originalname)
			},
		}),
	}))
	register(@UploadedFile() avatar: Express.Multer.File, @Body() dto: RegisterDto) {
		return this.authService.register(dto, avatar)
	}

	@Post('login')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}
}
