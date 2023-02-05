import { UserService } from './user.service';
import { UserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    byId(id: string): Promise<import("./user.entity").UserEntity>;
    update(id: string, dto: UserDto): Promise<import("./user.entity").UserEntity>;
}
