import { Base } from '../utils/base';
import { UserEntity } from '../user/user.entity';
import { repeatType } from '../utils/types/repeat';
export declare class RemindersEntity extends Base {
    author: UserEntity;
    title: string;
    date: number;
    repeat: repeatType;
    completed: boolean;
}
