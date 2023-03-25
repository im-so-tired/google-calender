import { EventsEntity } from './events.entity';
import { Repository } from 'typeorm';
import { EventsDto } from './events.dto';
export declare class EventsService {
    private readonly eventsRepository;
    constructor(eventsRepository: Repository<EventsEntity>);
    create(userId: number, dto: EventsDto): Promise<EventsEntity>;
    update(eventId: number, dto: EventsDto): Promise<EventsEntity>;
}
