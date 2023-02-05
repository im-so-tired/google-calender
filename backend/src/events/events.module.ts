import { Module } from '@nestjs/common'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { EventsEntity } from './events.entity'

@Module({
	controllers: [EventsController],
	providers: [EventsService],
	imports: [TypeOrmModule.forFeature([EventsEntity])],
})
export class EventsModule {}
