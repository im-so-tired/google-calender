import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { LoginDto, RegisterDto } from './auth.dto'
import { compare, genSalt, hash } from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
		private readonly ConfigService: ConfigService,
	) {
	}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id),
		}
	}

	async register(dto: RegisterDto, avatar: Express.Multer.File) {
		const oldUser = await this.userRepository.findOneBy({ email: dto.email })
		if (oldUser)
			throw new BadRequestException('Пользователь с таким email уже существует')
		console.log(avatar)
		const salt = await genSalt(10)
		const newUser = this.userRepository.create({
			email: dto.email,
			password: await hash(dto.password, salt),
			name: dto.name,
			avatarPath: avatar ? avatar.filename : '',
		})

		const user = await this.userRepository.save(newUser)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id),
		}
	}

	async validateUser(dto: LoginDto) {
		const user = await this.userRepository.findOne({
			where: { email: dto.email },
		})

		if (!user) throw new NotFoundException('User not found')

		const isValidPassword = await compare(dto.password, user.password)

		if (!isValidPassword) throw new UnauthorizedException('Wrong password')
		return user
	}

	async issueAccessToken(userId: number) {
		const data = {
			id: userId,
		}
		return await this.jwtService.signAsync(data, {
			expiresIn: '31d',
		})
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			avatarPath: user.avatarPath,
		}
	}
}
