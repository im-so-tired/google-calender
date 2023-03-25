import { UserEntity } from '../user/user.entity';
import { repeatType } from '../utils/types/repeat';
import { Base } from '../utils/base';
export declare class TasksEntity extends Base {
    author: UserEntity;
    title: string;
    time: bigint;
    description: string;
    repeat: repeatType;
    completed: boolean;
}
