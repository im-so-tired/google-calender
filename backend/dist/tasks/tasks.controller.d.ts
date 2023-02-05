import { TasksService } from './tasks.service';
import { TasksDto } from './tasks.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(userId: number, dto: TasksDto): Promise<import("./tasks.entity").TasksEntity>;
    byId(id: string): Promise<import("./tasks.entity").TasksEntity>;
    update(id: string, dto: TasksDto): Promise<import("./tasks.entity").TasksEntity>;
}
