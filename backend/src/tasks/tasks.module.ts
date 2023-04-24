import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventsEntity } from '../events/events.entity'
import { TasksEntity } from './tasks.entity'
import { UserEntity } from '../user/user.entity'

@Module({
	controllers: [TasksController],
	providers: [TasksService],
	imports: [TypeOrmModule.forFeature([TasksEntity])],
	exports: [TasksService],
})
export class TasksModule {
}
