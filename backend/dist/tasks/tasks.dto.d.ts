import { repeatType } from '../utils/types/repeat';
export declare class TasksDto {
    title: string;
    time: bigint;
    repeat: repeatType;
    description?: string;
    completed?: boolean;
}
