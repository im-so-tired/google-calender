import { UserEntity } from '../user/user.entity';
import { Base } from '../utils/base';
export declare class EventsEntity extends Base {
    author: UserEntity;
    title: string;
    startTime: bigint;
    endTime: bigint;
    guests: UserEntity[];
    location: string;
    description: string;
}
