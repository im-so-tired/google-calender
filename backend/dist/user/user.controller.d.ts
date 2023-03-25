import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { QueryParameters } from './user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getActivity(id: string, query: QueryParameters): Promise<{
        events: import("../events/events.entity").EventsEntity[];
        tasks: import("../tasks/tasks.entity").TasksEntity[];
    }>;
    byId(id: string): Promise<import("./user.entity").UserEntity>;
    update(id: string, dto: UserDto): Promise<import("./user.entity").UserEntity>;
}
