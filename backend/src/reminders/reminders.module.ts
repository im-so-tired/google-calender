import { Module } from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { RemindersController } from './reminders.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventsEntity } from '../events/events.entity'
import { RemindersEntity } from './reminders.entity'
import { UserEntity } from '../user/user.entity'

@Module({
	controllers: [RemindersController],
	providers: [RemindersService],
	imports: [TypeOrmModule.forFeature([RemindersEntity])],
	exports: [RemindersService],
})
export class RemindersModule {
}
