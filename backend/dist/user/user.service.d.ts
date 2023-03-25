import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { QueryParameters } from './user.interface';
export declare class UserService {
    private readonly UserEntity;
    constructor(UserEntity: Repository<UserEntity>);
    byId(userId: number): Promise<UserEntity>;
    update(userId: number, dto: UserDto): Promise<UserEntity>;
    getActivity(userId: number, query: QueryParameters): Promise<{
        events: import("../events/events.entity").EventsEntity[];
        tasks: import("../tasks/tasks.entity").TasksEntity[];
    }>;
}
