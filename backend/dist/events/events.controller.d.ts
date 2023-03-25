import { EventsService } from './events.service';
import { EventsDto } from './events.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(userId: number, dto: EventsDto): Promise<import("./events.entity").EventsEntity>;
    update(id: string, dto: EventsDto): Promise<import("./events.entity").EventsEntity>;
}
