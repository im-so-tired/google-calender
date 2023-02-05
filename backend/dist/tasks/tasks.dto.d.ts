import { repeatType } from '../utils/types/repeat';
export declare class TasksDto {
    title: string;
    startTime: number;
    endTime: number;
    repeat: repeatType;
    description?: string;
}
