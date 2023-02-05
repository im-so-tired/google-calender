"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = void 0;
const getTypeOrmConfig = async (configService) => ({
    type: 'postgres',
    host: 'localhost',
    port: configService.get('PORT'),
    database: configService.get('DATABASE'),
    username: configService.get('USER'),
    password: configService.get('PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
});
exports.getTypeOrmConfig = getTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map