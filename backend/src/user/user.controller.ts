import {
	Controller,
	Get,
	Param,
	HttpCode,
	Put,
	Body,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	@HttpCode(200)
	@Auth
	async byId(@Param('id') id: string) {
		return await this.userService.byId(+id)
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@Param('id') id: string, @Body() dto: UserDto) {
		return await this.userService.update(+id, dto)
	}
}
