"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const events_entity_1 = require("../events/events.entity");
const base_1 = require("../utils/base");
const reminders_entity_1 = require("../reminders/reminders.entity");
const tasks_entity_1 = require("../tasks/tasks.entity");
let UserEntity = class UserEntity extends base_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', name: 'avatar_path' }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatarPath", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => events_entity_1.EventsEntity, event => event.author),
    (0, typeorm_1.JoinColumn)({ name: 'events_id' }),
    __metadata("design:type", Array)
], UserEntity.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reminders_entity_1.RemindersEntity, reminder => reminder.author),
    (0, typeorm_1.JoinColumn)({ name: 'reminders_id' }),
    __metadata("design:type", Array)
], UserEntity.prototype, "reminders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tasks_entity_1.TasksEntity, task => task.author),
    (0, typeorm_1.JoinColumn)({ name: 'tasks_id' }),
    __metadata("design:type", Array)
], UserEntity.prototype, "tasks", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map