import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
export declare class UserService {
    private readonly UserEntity;
    constructor(UserEntity: Repository<UserEntity>);
    byId(userId: number): Promise<UserEntity>;
    update(userId: number, dto: UserDto): Promise<UserEntity>;
}
