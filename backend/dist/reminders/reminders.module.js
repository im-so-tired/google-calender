"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemindersModule = void 0;
const common_1 = require("@nestjs/common");
const reminders_service_1 = require("./reminders.service");
const reminders_controller_1 = require("./reminders.controller");
const typeorm_1 = require("@nestjs/typeorm");
const reminders_entity_1 = require("./reminders.entity");
let RemindersModule = class RemindersModule {
};
RemindersModule = __decorate([
    (0, common_1.Module)({
        controllers: [reminders_controller_1.RemindersController],
        providers: [reminders_service_1.RemindersService],
        imports: [typeorm_1.TypeOrmModule.forFeature([reminders_entity_1.RemindersEntity])],
    })
], RemindersModule);
exports.RemindersModule = RemindersModule;
//# sourceMappingURL=reminders.module.js.map