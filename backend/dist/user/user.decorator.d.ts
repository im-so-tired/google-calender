import { UserEntity } from './user.entity';
export declare const User: (...dataOrPipes: (keyof UserEntity | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
