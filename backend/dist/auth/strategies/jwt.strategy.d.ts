import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../user/user.entity';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    private readonly ConfigService;
    constructor(userRepository: Repository<UserEntity>, ConfigService: ConfigService);
    validate({ id }: Pick<UserEntity, 'id'>): Promise<UserEntity[]>;
}
export {};
