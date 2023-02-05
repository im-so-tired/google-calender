import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventsEntity } from '../events/events.entity'
import { UserEntity } from './user.entity'
import { TasksEntity } from '../tasks/tasks.entity'
import { RemindersEntity } from '../reminders/reminders.entity'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
