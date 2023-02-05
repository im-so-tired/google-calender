import { EventsEntity } from '../events/events.entity';
import { Base } from '../utils/base';
import { RemindersEntity } from '../reminders/reminders.entity';
import { TasksEntity } from '../tasks/tasks.entity';
export declare class UserEntity extends Base {
    email: string;
    password: string;
    name: string;
    avatarPath: string;
    events: EventsEntity[];
    reminders: RemindersEntity[];
    tasks: TasksEntity[];
}
