import { TasksEntity } from './tasks.entity';
import { Repository } from 'typeorm';
import { TasksDto } from './tasks.dto';
export declare class TasksService {
    private readonly tasksRepository;
    constructor(tasksRepository: Repository<TasksEntity>);
    create(userId: number, dto: TasksDto): Promise<TasksEntity>;
    byId(id: number): Promise<TasksEntity>;
    update(id: number, dto: TasksDto): Promise<TasksEntity>;
}
