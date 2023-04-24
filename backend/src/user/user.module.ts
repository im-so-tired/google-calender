import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventsEntity } from '../events/events.entity'
import { UserEntity } from './user.entity'
import { TasksEntity } from '../tasks/tasks.entity'
import { RemindersEntity } from '../reminders/reminders.entity'
import { TasksService } from '../tasks/tasks.service'
import { TasksModule } from '../tasks/tasks.module'
import { RemindersModule } from '../reminders/reminders.module'
import { EventsModule } from '../events/events.module'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		TasksModule,
		RemindersModule,
		EventsModule
	],
})
export class UserModule {
}
