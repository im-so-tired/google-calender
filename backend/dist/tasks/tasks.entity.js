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
exports.TasksEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const moment = require("moment");
const base_1 = require("../utils/base");
let TasksEntity = class TasksEntity extends base_1.Base {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, author => author.tasks),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TasksEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TasksEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: moment().unix(), name: 'start_time', type: 'bigint' }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], TasksEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', type: 'text' }),
    __metadata("design:type", String)
], TasksEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'no-repeat' }),
    __metadata("design:type", String)
], TasksEntity.prototype, "repeat", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TasksEntity.prototype, "completed", void 0);
TasksEntity = __decorate([
    (0, typeorm_1.Entity)('tasks')
], TasksEntity);
exports.TasksEntity = TasksEntity;
//# sourceMappingURL=tasks.entity.js.map