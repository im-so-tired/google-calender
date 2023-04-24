import { Module } from '@nestjs/common'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventsEntity } from './events.entity'

@Module({
	controllers: [EventsController],
	providers: [EventsService],
	imports: [TypeOrmModule.forFeature([EventsEntity])],
	exports: [EventsService],
})
export class EventsModule {
}
