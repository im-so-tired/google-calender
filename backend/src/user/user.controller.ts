import {
	Controller,
	Get,
	Param,
	HttpCode,
	Put,
	Body,
	UsePipes,
	ValidationPipe, Query, Res,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserDto } from './user.dto'
import { User } from './user.decorator'
import { QueryParameters } from './user.interface'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	@Get('activity')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async getActivity(@User('id') id: string, @Query() query: QueryParameters) {
		return await this.userService.getActivity(+id, query)
	}

	@Get(':id')
	@HttpCode(200)
	@Auth
	async byId(@Param('id') id: string) {
		return await this.userService.byId(+id)
	}

	@Put()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth
	async update(@User('id') id: string, @Body() dto: UserDto) {
		return await this.userService.update(+id, dto)
	}

	@Get('avatar/:filename')
	getImage(@Param('filename') filename, @Res() res) {
		return res.sendFile(filename, { root: 'upload/avatars' })
	}
}

